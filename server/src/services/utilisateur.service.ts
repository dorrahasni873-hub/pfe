import db from "../db";
import { utilisateur } from "../db/schema";
import { eq } from "drizzle-orm";

export const getUsersWithMaintenances = async () => {
  return await db.query.utilisateur.findMany({
    with: {
      maintenances: {
        with: {
          vehicule: true,
        },
      },
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await db.query.utilisateur.findFirst({
    where: eq(utilisateur.email, email),
    with: {
      maintenances: {
        with: {
          vehicule: true,
        },
      },
    },
  });
};

export const getUsers = async () => {
  return await db.query.utilisateur.findMany();
};

export const getUserById = async (id: string) => {
  return await db.query.utilisateur.findFirst({
    where: eq(utilisateur.id_utilisateur, id),
    with: {
      maintenances: {
        with: {
          vehicule: true,
        },
      },
    },
  });
};

export const createUser = async (data: {
  nom: string;
  prenom: string;
  email?: string;
  motDePasse: string;
  tel?: string;
  role: string;
}) => {
  return await db.insert(utilisateur).values(data);
};

export const deleteUser = async (id: string) => {
  return await db.delete(utilisateur).where(eq(utilisateur.id_utilisateur, id));
};

export const updateUser = async (
  id: string,
  data: Partial<{
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    tel: string;
    role: string;
    dateMiseAJour: string;
  }>,
) => {
  return await db
    .update(utilisateur)
    .set(data)
    .where(eq(utilisateur.id_utilisateur, id));
};
