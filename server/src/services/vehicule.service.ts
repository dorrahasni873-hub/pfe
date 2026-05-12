import db from "../base-de-donnees";
import { vehicules, maintenance } from "../base-de-donnees/schema";
import { eq } from "drizzle-orm";

export const getVehicules = async () => {
  return await db.query.vehicules.findMany();
};

export const getVehiculeByMatricule = async (matricule: string) => {
  return await db.query.vehicules.findFirst({
    where: eq(vehicules.matricule, matricule),
    with: {
      maintenances: true,
    },
  });
};

export const createVehicule = async (data: {
  matricule: string;
  marqueVoiture: string;
  dateCirculation: string;
  dateVisite: string;
  dateTaxe: string;
  etat: string;
}) => {
  return await db.insert(vehicules).values(data);
};

export const deleteVehicule = async (matricule: string) => {
  return await db.delete(vehicules).where(eq(vehicules.matricule, matricule));
};

export const updateVehicule = async (
  matricule: string,
  data: Partial<{
    marqueVoiture: string;
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
