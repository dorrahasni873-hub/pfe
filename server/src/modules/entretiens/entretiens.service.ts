import db from "../../database/client";
import { entretien } from "../../database/schema";
import { eq } from "drizzle-orm";
import type { InferModel } from "drizzle-orm";

export type Entretien = InferModel<typeof entretien>;
export type EntretienInsert = InferModel<typeof entretien, "insert">;
export type EntretienUpdate = Partial<EntretienInsert>;

export const getAll = async () => {
  return db.query.entretien.findMany();
};

export const getById = async (id: string) => {
  return db.query.entretien.findFirst({
    where: eq(entretien.id_entretien, id),
  });
};

export const create = async (data: {
  dateEntretien: string;
  typeIntervention: string;
  descriptionIntervention: string;
  etat: string;
  matricule: string;
  maintenanceId: string;
  panneId: string;
}) => db.insert(entretien).values(data).returning();

export const update = async (id: string, data: EntretienUpdate) =>
  db
    .update(entretien)
    .set(data)
    .where(eq(entretien.id_entretien, id))
    .returning();

export const remove = async (id: string) =>
  db.delete(entretien).where(eq(entretien.id_entretien, id));
