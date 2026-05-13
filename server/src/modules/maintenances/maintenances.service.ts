import db from "../../database/client";
import { maintenance } from "../../database/schema";
import { eq } from "drizzle-orm";
import type { InferModel } from "drizzle-orm";

export type Maintenance = InferModel<typeof maintenance>;
export type MaintenanceInsert = InferModel<typeof maintenance, "insert">;
export type MaintenanceUpdate = Partial<MaintenanceInsert>;

export const getAll = async () => {
  return db.query.maintenance.findMany();
};

export const getById = async (id: string) => {
  return db.query.maintenance.findFirst({
    where: eq(maintenance.id_maintenance, id),
  });
};

export const create = async (data: {
  matricule: string;
  description: string;
  dateMaintenance: string;
  cout: string;
  kilometrage: number;
  prochainEntretien: string;
  id_utilisateur: string;
}) => db.insert(maintenance).values(data).returning();

export const update = async (id: string, data: MaintenanceUpdate) =>
  db
    .update(maintenance)
    .set(data)
    .where(eq(maintenance.id_maintenance, id))
    .returning();

export const remove = async (id: string) =>
  db.delete(maintenance).where(eq(maintenance.id_maintenance, id));
