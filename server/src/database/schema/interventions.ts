import { pgTable, varchar, uuid, date } from "drizzle-orm/pg-core";

export const entretien = pgTable("entretien", {
  id_entretien: uuid("id_entretien").defaultRandom().primaryKey(),
  dateEntretien: date("date_entretien").notNull(),
  typeIntervention: varchar("type_intervention", { length: 300 }).notNull(),
  descriptionIntervention: varchar("description_intervention", { length: 300 }).notNull(),
  etat: varchar("etat", { length: 100 }).notNull(),
  matricule: varchar("matricule", { length: 300 }).notNull(),
  maintenanceId: uuid("maintenance_id").notNull(),
  panneId: uuid("id_panne").notNull(),
});
