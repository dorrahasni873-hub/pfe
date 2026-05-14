import db from "../../database/client";
import { utilisateur, chauffeur } from "../../database/schema";
import { eq } from "drizzle-orm";
import { signToken } from "../../shared/utils/token";
import { Account } from "../../shared/types";

export const registerUser = async (data: {
  email: string;
  motDePasse: string;
  nom: string;
  prenom: string;
  tel: string;
}) => {
  return await db.insert(utilisateur).values(data).returning();
};

export const loginUser = async (email: string, motDePasse: string) => {
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

  if (!account || account.password !== motDePasse) {
    return null;
  }

  const token = signToken({ id: account.id, role: account.role });
  return { token, user: account };
};

export const getAuthenticatedUser = async (userId: string, role: string) => {
  if (role !== "chauffeur") {
    return await db.query.utilisateur.findFirst({
      where: eq(utilisateur.id_utilisateur, userId),
    });
  }
  const chauffeurUser = await db.query.chauffeur.findFirst({
    where: eq(chauffeur.id_chauffeur, userId),
  });
  if (chauffeurUser) {
    return { ...chauffeurUser, role: "chauffeur" };
  }
  return null;
};
