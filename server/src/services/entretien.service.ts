import db from "../base-de-donnees";
import { entretien } from "../base-de-donnees/schema";
import { eq } from "drizzle-orm";
import type { InferModel } from "drizzle-orm";

export type Entretien = InferModel<typeof entretien>;
export type EntretienInsert = InferModel<typeof entretien, "insert">;
export type EntretienUpdate = Partial<EntretienInsert>;

export const getAllEntretiens = async () => {
  return db.query.entretien.findMany();
};

export const getEntretienById = async (id: string) => {
  return db.query.entretien.findFirst({
    where: eq(entretien.id_entretien, id),
  });
};

export const createEntretien = async (data: {
  dateEntretien: string;
  typeIntervention: string;
  descriptionIntervention: string;
  etat: string;
  matricule: string;
  maintenanceId: string;
  panneId: string;
}) => db.insert(entretien).values(data).returning();

export const updateEntretien = async (id: string, data: EntretienUpdate) =>
  db
    .update(entretien)
    .set(data)
    .where(eq(entretien.id_entretien, id))
    .returning();

export const deleteEntretien = async (id: string) =>
  db.delete(entretien).where(eq(entretien.id_entretien, id));
