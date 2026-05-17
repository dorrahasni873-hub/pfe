import { pgTable, varchar, uuid, integer, date } from "drizzle-orm/pg-core";

export const carnetDeBord = pgTable("carnet_de_bord", {
  id_carnet: uuid("id_carnet").defaultRandom().primaryKey(),
  dateDeDebut: date("date_debut").notNull(),
  dateDeFin: date("date_fin").notNull(),
  km_depart: integer("km_depart").notNull(),
  km_arrive: integer("km_arrive").notNull(),
  id_chauffeur: uuid("id_chauffeur").notNull(),
  matricule: varchar("matricule", { length: 300 }).notNull(),
});
