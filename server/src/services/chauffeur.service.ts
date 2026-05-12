import db from "../base-de-donnees";
import { chauffeur } from "../base-de-donnees/schema";
import { eq } from "drizzle-orm";
import type { InferModel } from "drizzle-orm";

export type Chauffeur = InferModel<typeof chauffeur>;
export type ChauffeurInsert = InferModel<typeof chauffeur, "insert">;
export type ChauffeurUpdate = Partial<ChauffeurInsert>;

export const getAllChauffeurs = async () => {
  return db.query.chauffeur.findMany();
};

export const getChauffeurById = async (
  id: string,
): Promise<Chauffeur | null> => {
  const chauffeurRow = await db.query.chauffeur.findFirst({
    where: eq(chauffeur.id_chauffeur, id),
  });

  return chauffeurRow ?? null;
};

export const createChauffeur = async (
  data: ChauffeurInsert,
): Promise<Chauffeur[]> => db.insert(chauffeur).values(data).returning();

export const updateChauffeur = async (
  id_chauffeur: string,
  data: ChauffeurUpdate,
): Promise<Chauffeur[]> =>
  db
    .update(chauffeur)
    .set(data)
    .where(eq(chauffeur.id_chauffeur, id_chauffeur))
    .returning();

export const deleteChauffeur = async (id_chauffeur: string) =>
  db.delete(chauffeur).where(eq(chauffeur.id_chauffeur, id_chauffeur));
