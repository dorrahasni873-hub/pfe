import bcrypt from "bcrypt";
import db from "../../database/client";
import { utilisateur, chauffeur } from "../../database/schema";
import { eq } from "drizzle-orm";
import { signToken } from "../../shared/utils/token";
import { Account } from "../../shared/types";

const SALT_ROUNDS = 10;

export const registerUser = async (data: {
  email: string;
  motDePasse: string;
  nom: string;
  prenom: string;
  tel: string;
}) => {
  const motDePasseHash = await bcrypt.hash(data.motDePasse, SALT_ROUNDS);
  return await db
    .insert(utilisateur)
    .values({ ...data, motDePasse: motDePasseHash })
    .returning();
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

  if (!account || !(await bcrypt.compare(motDePasse, account.password))) {
    return null;
  }

  const token = signToken({ id: account.id, role: account.role });
  return { token, user: account };
};

export const deleteAccount = async (userId: string, role: string, password: string) => {
  let account: Account | null = null;

  if (role !== "chauffeur") {
    const user = await db.query.utilisateur.findFirst({
      where: eq(utilisateur.id_utilisateur, userId),
    });
    if (user) {
      account = {
        id: user.id_utilisateur,
        email: user.email,
        password: user.motDePasse,
        role: user.role,
      };
    }
  } else {
    const chauffeurUser = await db.query.chauffeur.findFirst({
      where: eq(chauffeur.id_chauffeur, userId),
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

  if (!account || !(await bcrypt.compare(password, account.password))) {
    return false;
  }

  if (role !== "chauffeur") {
    await db
      .delete(utilisateur)
      .where(eq(utilisateur.id_utilisateur, userId));
  } else {
    await db
      .delete(chauffeur)
      .where(eq(chauffeur.id_chauffeur, userId));
  }

  return true;
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

export const changePassword = async (
  userId: string,
  role: string,
  oldPassword: string,
  newPassword: string,
) => {
  let account: Account | null = null;

  if (role !== "chauffeur") {
    const user = await db.query.utilisateur.findFirst({
      where: eq(utilisateur.id_utilisateur, userId),
    });
    if (user) {
      account = {
        id: user.id_utilisateur,
        email: user.email,
        password: user.motDePasse,
        role: user.role,
      };
    }
  } else {
    const chauffeurUser = await db.query.chauffeur.findFirst({
      where: eq(chauffeur.id_chauffeur, userId),
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

  if (!account || !(await bcrypt.compare(oldPassword, account.password))) {
    return false;
  }

  const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

  if (role !== "chauffeur") {
    await db
      .update(utilisateur)
      .set({ motDePasse: newHash })
      .where(eq(utilisateur.id_utilisateur, userId));
  } else {
    await db
      .update(chauffeur)
      .set({ password: newHash })
      .where(eq(chauffeur.id_chauffeur, userId));
  }

  return true;
};
