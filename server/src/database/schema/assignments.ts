import { pgTable, varchar, uuid, date } from "drizzle-orm/pg-core";

export const affectation = pgTable("affectation", {
  id_affectation: uuid("id_affectation").defaultRandom().primaryKey(),
  dateAffectation: date("date_affectation").notNull(),
  dateDebut: date("date_debut").notNull(),
  typeAffectation: varchar("type_affectation", { length: 300 }).notNull(),
  etat: varchar("etat", { length: 100 }).notNull(),
  id_chauffeur: uuid("id_chauffeur").notNull(),
  matricule: varchar("matricule", { length: 300 }).notNull(),
});
