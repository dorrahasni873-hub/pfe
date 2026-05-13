import db from "../../database/client";
import { chauffeur } from "../../database/schema";
import { eq } from "drizzle-orm";
import type { InferModel } from "drizzle-orm";

export type Chauffeur = InferModel<typeof chauffeur>;
export type ChauffeurInsert = InferModel<typeof chauffeur, "insert">;
export type ChauffeurUpdate = Partial<ChauffeurInsert>;

export const getAll = async () => {
  return db.query.chauffeur.findMany();
};

export const getById = async (id: string): Promise<Chauffeur | null> => {
  const row = await db.query.chauffeur.findFirst({
    where: eq(chauffeur.id_chauffeur, id),
  });
  return row ?? null;
};

export const create = async (
  data: ChauffeurInsert,
): Promise<Chauffeur[]> => db.insert(chauffeur).values(data).returning();

export const update = async (
  id: string,
  data: ChauffeurUpdate,
): Promise<Chauffeur[]> =>
  db
    .update(chauffeur)
    .set(data)
    .where(eq(chauffeur.id_chauffeur, id))
    .returning();

export const remove = async (id: string) =>
  db.delete(chauffeur).where(eq(chauffeur.id_chauffeur, id));
