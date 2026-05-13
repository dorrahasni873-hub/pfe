import db from "../../database/client";
import { carnetDeBord } from "../../database/schema";
import { eq } from "drizzle-orm";
import type { InferModel } from "drizzle-orm";

export type CarnetDeBord = InferModel<typeof carnetDeBord>;
export type CarnetDeBordInsert = InferModel<typeof carnetDeBord, "insert">;
export type CarnetDeBordUpdate = Partial<CarnetDeBordInsert>;

export const getAll = async () => {
  return db.query.carnetDeBord.findMany();
};

export const getById = async (id: string): Promise<CarnetDeBord | null> => {
  const row = await db.query.carnetDeBord.findFirst({
    where: eq(carnetDeBord.id_carnet, id),
  });
  return row ?? null;
};

export const create = async (
  data: CarnetDeBordInsert,
): Promise<CarnetDeBord[]> => db.insert(carnetDeBord).values(data).returning();

export const update = async (
  id: string,
  data: CarnetDeBordUpdate,
): Promise<CarnetDeBord[]> =>
  db
    .update(carnetDeBord)
    .set(data)
    .where(eq(carnetDeBord.id_carnet, id))
    .returning();

export const remove = async (id: string) =>
  db.delete(carnetDeBord).where(eq(carnetDeBord.id_carnet, id));
