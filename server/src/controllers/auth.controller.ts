import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { signToken } from "../utils/jwt";
import { hash, compare } from "bcryptjs";
import db from "../db";
import { utilisateur } from "../db/schema";
import { eq } from "drizzle-orm";
import { AuthRequest } from "../middlewares/auth.middleware";

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

    const hashedPassword = await hash(data.motDePasse, 10);

    const user = await db
      .insert(utilisateur)
      .values({ ...data, motDePasse: hashedPassword })
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

    const user = await db.query.utilisateur.findFirst({
      where: eq(utilisateur.email, email),
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isValid = await compare(motDePasse, user.motDePasse);
    if (!isValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ id: user.id, role: user.role });
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const checkAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    res.json({ user });
  } catch (err) {
    next(err);
  }
};
