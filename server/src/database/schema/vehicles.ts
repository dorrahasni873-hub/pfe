import { pgTable, varchar, date } from "drizzle-orm/pg-core";

export const vehicules = pgTable("vehicules", {
  matricule: varchar("matricule", { length: 300 }).primaryKey(),
  marque: varchar("marque", { length: 300 }).notNull(),
  dateCirculation: date("date_circulation").notNull(),
  dateVisite: date("date_visite").notNull(),
  dateTaxe: date("date_taxe").notNull(),
  etat: varchar("etat", { length: 100 }).notNull(),
});
