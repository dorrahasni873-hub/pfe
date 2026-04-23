import db from "../db";
import { affectation } from "../db/schema";
import { eq } from "drizzle-orm";
import type { InferModel } from "drizzle-orm";

export type Affectation = InferModel<typeof affectation>;
export type AffectationInsert = InferModel<typeof affectation, "insert">;
export type AffectationUpdate = Partial<AffectationInsert>;

export const getAllAffectations = async () => {
  return db.query.affectation.findMany();
};

export const getAffectationById = async (
  id: string,
): Promise<Affectation | null> => {
  const row = await db.query.affectation.findFirst({
    where: eq(affectation.id_affectation, id),
  });

  return row ?? null;
};

export const createAffectation = async (
  data: AffectationInsert,
): Promise<Affectation[]> => db.insert(affectation).values(data).returning();

export const updateAffectation = async (
  id_affectation: string,
  data: AffectationUpdate,
): Promise<Affectation[]> =>
  db
    .update(affectation)
    .set(data)
    .where(eq(affectation.id_affectation, id_affectation))
    .returning();

export const deleteAffectation = async (id_affectation: string) =>
  db.delete(affectation).where(eq(affectation.id_affectation, id_affectation));
