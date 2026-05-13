import db from "../../database/client";
import { panne } from "../../database/schema";
import { eq } from "drizzle-orm";
import type { InferModel } from "drizzle-orm";

export type Panne = InferModel<typeof panne>;
export type PanneInsert = InferModel<typeof panne, "insert">;
export type PanneUpdate = Partial<PanneInsert>;

export const getAll = async () => {
  return db.query.panne.findMany({
    with: {
      chauffeur: true,
      vehicule: true,
    },
  });
};

export const getById = async (id: string) => {
  return db.query.panne.findFirst({
    where: eq(panne.id_panne, id),
    with: {
      chauffeur: true,
      vehicule: true,
    },
  });
};

export const create = async (data: {
  typePanne: string;
  dateDeclaration: string;
  chauffeurId: string;
  matricule: string;
  status?: string;
}) => db.insert(panne).values(data).returning();

export const update = async (id: string, data: PanneUpdate) =>
  db.update(panne).set(data).where(eq(panne.id_panne, id)).returning();

export const remove = async (id: string) =>
  db.delete(panne).where(eq(panne.id_panne, id));
