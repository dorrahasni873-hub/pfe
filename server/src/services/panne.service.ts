import db from "../db";
import { panne } from "../db/schema";
import { eq } from "drizzle-orm";
import type { InferModel } from "drizzle-orm";

export type Panne = InferModel<typeof panne>;
export type PanneInsert = InferModel<typeof panne, "insert">;
export type PanneUpdate = Partial<PanneInsert>;

export const getAllPannes = async () => {
  return db.query.panne.findMany();
};

export const getPanneById = async (id: string) => {
  return db.query.panne.findFirst({
    where: eq(panne.id_panne, id),
  });
};

export const createPanne = async (data: {
  typePanne: string;
  dateDeclaration: string;
  chauffeurId: string;
}) => db.insert(panne).values(data).returning();

export const updatePanne = async (id: string, data: PanneUpdate) =>
  db.update(panne).set(data).where(eq(panne.id_panne, id)).returning();

export const deletePanne = async (id: string) =>
  db.delete(panne).where(eq(panne.id_panne, id));
