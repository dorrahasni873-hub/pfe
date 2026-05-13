import { pgTable, varchar, uuid, integer, decimal, date } from "drizzle-orm/pg-core";

export const maintenance = pgTable("maintenance", {
  id_maintenance: uuid("id_maintenance").defaultRandom().primaryKey(),
  id_utilisateur: uuid("id_utilisateur").notNull(),
  matricule: varchar("matricule", { length: 300 }).notNull(),
  description: varchar("description", { length: 100 }).notNull(),
  dateMaintenance: date("date_maintenance").notNull(),
  cout: decimal("cout", { precision: 10, scale: 2 }).notNull(),
  kilometrage: integer("kilometrage").notNull(),
  prochainEntretien: date("prochain_entretien").notNull(),
});
