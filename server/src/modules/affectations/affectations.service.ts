import db from "../../database/client";
import { affectation } from "../../database/schema";
import { eq } from "drizzle-orm";
import type { InferModel } from "drizzle-orm";

export type Affectation = InferModel<typeof affectation>;
export type AffectationInsert = InferModel<typeof affectation, "insert">;
export type AffectationUpdate = Partial<AffectationInsert>;

export const getAll = async () => {
  return db.query.affectation.findMany();
};

export const getById = async (id: string): Promise<Affectation | null> => {
  const row = await db.query.affectation.findFirst({
    where: eq(affectation.id_affectation, id),
  });
  return row ?? null;
};

export const create = async (
  data: AffectationInsert,
): Promise<Affectation[]> => db.insert(affectation).values(data).returning();

export const update = async (
  id: string,
  data: AffectationUpdate,
): Promise<Affectation[]> =>
  db
    .update(affectation)
    .set(data)
    .where(eq(affectation.id_affectation, id))
    .returning();

export const remove = async (id: string) =>
  db.delete(affectation).where(eq(affectation.id_affectation, id));
