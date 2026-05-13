import db from "../../database/client";
import { utilisateur } from "../../database/schema";
import { eq } from "drizzle-orm";

export const getAll = async () => {
  return await db.query.utilisateur.findMany();
};

export const getById = async (id: string) => {
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

export const getByEmail = async (email: string) => {
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

export const getAllWithMaintenances = async () => {
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

export const create = async (data: {
  nom: string;
  prenom: string;
  email?: string;
  motDePasse: string;
  tel?: string;
  role: string;
}) => {
  return await db.insert(utilisateur).values(data);
};

export const update = async (
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

export const remove = async (id: string) => {
  return await db
    .delete(utilisateur)
    .where(eq(utilisateur.id_utilisateur, id));
};
