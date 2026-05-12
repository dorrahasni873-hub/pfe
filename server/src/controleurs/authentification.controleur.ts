import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { signToken } from "../utilitaires/jeton";
import { hash, compare } from "bcryptjs";
import db from "../base-de-donnees";
import { chauffeur, utilisateur } from "../base-de-donnees/schema";
import { eq } from "drizzle-orm";
import { RequeteAuthentification } from "../middlewares/authentification.middleware";
import { Account } from "../utilitaires/types";

const registerSchema = z.object({
  email: z.string().email(),
  motDePasse: z.string(),
  nom: z.string(),
  prenom: z.string(),
  tel: z.string(),
});

const loginSchema = z.object({
  email: z.string().email(),
  motDePasse: z.string(),
});

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = registerSchema.parse(req.body);

    // const hashedPassword = await hash(data.motDePasse, 10);

    const user = await db
      .insert(utilisateur)
      .values({ ...data })
      .returning();

    res.status(201).json(user[0]);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, motDePasse } = loginSchema.parse(req.body);

    let account: Account | null = null;

    const user = await db.query.utilisateur.findFirst({
      where: eq(utilisateur.email, email),
    });
    if (user) {
      account = {
        id: user.id_utilisateur,
        email: user.email,
        password: user.motDePasse,
        role: user.role,
      };
    }

    if (!account) {
      const chauffeurUser = await db.query.chauffeur.findFirst({
        where: eq(chauffeur.email, email),
      });

      if (chauffeurUser) {
        account = {
          id: chauffeurUser.id_chauffeur,
          email: chauffeurUser.email,
          password: chauffeurUser.password,
          role: "chauffeur",
        };
      }
    }

    if (!account) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (account.password !== motDePasse) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken({
      id: account.id,
      role: account.role,
    });

    return res.json({ token, user: account });
  } catch (err) {
    next(err);
  }
};
export const checkAuth = async (
  req: RequeteAuthentification,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let account = null;

    if (user.role !== "chauffeur") {
      account = await db.query.utilisateur.findFirst({
        where: eq(utilisateur.id_utilisateur, user.id),
      });
    } else if (user.role === "chauffeur") {
      account = await db.query.chauffeur.findFirst({
        where: eq(chauffeur.id_chauffeur, user.id),
      });
    }

    if (!account) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.json({ user: account });
  } catch (err) {
    next(err);
  }
};
