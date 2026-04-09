import db from "../db";
import { vehicules, maintenance } from "../db/schema";
import { eq } from "drizzle-orm";

export const getVehiculesWithMaintenances = async () => {
  return await db.query.vehicules.findMany({
    with: {
      maintenances: true,
    },
  });
};

export const getVehiculeByMatricule = async (matricule: number) => {
  return await db.query.vehicules.findFirst({
    where: eq(vehicules.matricule, matricule),
    with: {
      maintenances: true,
    },
  });
};

export const createVehicule = async (data: {
  matricule: number;
  marqueVoiture: string;
  dateCirculation: string;
  dateVisite: string;
  dateTaxe: string;
  etat: string;
  dateCreation: string;
  dateMiseAJour: string;
}) => {
  return await db.insert(vehicules).values(data);
};

export const deleteVehicule = async (matricule: number) => {
  return await db.delete(vehicules).where(eq(vehicules.matricule, matricule));
};

export const updateVehicule = async (
  matricule: number,
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
