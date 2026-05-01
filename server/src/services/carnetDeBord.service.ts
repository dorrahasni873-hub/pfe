import db from "../db";
import { carnetDeBord } from "../db/schema";
import { eq } from "drizzle-orm";
import type { InferModel } from "drizzle-orm";
import { AffectationUpdate } from "./affectation.service";

export type CarnetDeBord = InferModel<typeof carnetDeBord>;
export type CarnetDeBordInsert = InferModel<typeof carnetDeBord, "insert">;
export type CarnetDeBordUpdate = Partial<CarnetDeBordInsert>;

export const getAllCarnetsDeBord = async () => {
  return db.query.carnetDeBord.findMany();
};

export const getCarnetDeBordById = async (
  id: string,
): Promise<CarnetDeBord | null> => {
  const row = await db.query.carnetDeBord.findFirst({
    where: eq(carnetDeBord.id_carnet, id),
  });

  return row ?? null;
};

export const createCarnetDeBord = async (
  data: CarnetDeBordInsert,
): Promise<CarnetDeBord[]> => db.insert(carnetDeBord).values(data).returning();

export const updateCarnetDeBord = async (
  id_carnet: string,
  data: CarnetDeBordUpdate,
): Promise<CarnetDeBord[]> =>
  db
    .update(carnetDeBord)
    .set(data)
    .where(eq(carnetDeBord.id_carnet, id_carnet))
    .returning();

export const deleteCarnetDeBord = async (id_carnet: string) =>
  db.delete(carnetDeBord).where(eq(carnetDeBord.id_carnet, id_carnet));
