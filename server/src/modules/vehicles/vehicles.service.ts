import db from "../../database/client";
import { vehicules } from "../../database/schema";
import { eq } from "drizzle-orm";

export const getAll = async () => {
  return await db.query.vehicules.findMany();
};

export const getByMatricule = async (matricule: string) => {
  return await db.query.vehicules.findFirst({
    where: eq(vehicules.matricule, matricule),
    with: {
      maintenances: true,
    },
  });
};

export const create = async (data: {
  matricule: string;
  marque: string;
  dateCirculation: string;
  dateVisite: string;
  dateTaxe: string;
  etat: string;
}) => {
  return await db.insert(vehicules).values(data);
};

export const update = async (
  matricule: string,
  data: Partial<{
    marque: string;
    dateCirculation: string;
    dateVisite: string;
    dateTaxe: string;
    etat: string;
    dateMiseAJour: string;
  }>,
) => {
  return await db
    .update(vehicules)
    .set(data)
    .where(eq(vehicules.matricule, matricule));
};

export const remove = async (matricule: string) => {
  return await db
    .delete(vehicules)
    .where(eq(vehicules.matricule, matricule));
};
