import bcrypt from "bcrypt";
import db from "../../database/client";
import { chauffeur } from "../../database/schema";
import { eq } from "drizzle-orm";
import type { InferModel } from "drizzle-orm";

const SALT_ROUNDS = 10;

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
): Promise<Chauffeur[]> => {
  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
  return db
    .insert(chauffeur)
    .values({ ...data, password: passwordHash })
    .returning();
};

export const update = async (
  id: string,
  data: ChauffeurUpdate,
): Promise<Chauffeur[]> => {
  const updateData = { ...data };
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, SALT_ROUNDS);
  }
  return db
    .update(chauffeur)
    .set(updateData)
    .where(eq(chauffeur.id_chauffeur, id))
    .returning();
};

export const remove = async (id: string) =>
  db.delete(chauffeur).where(eq(chauffeur.id_chauffeur, id));
