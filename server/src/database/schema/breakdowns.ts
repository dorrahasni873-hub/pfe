import { pgTable, varchar, uuid, date } from "drizzle-orm/pg-core";

export const panne = pgTable("panne", {
  id_panne: uuid("id_panne").defaultRandom().primaryKey(),
  typePanne: varchar("type_panne", { length: 300 }).notNull(),
  dateDeclaration: date("date_declaration").notNull(),
  chauffeurId: uuid("id_chauffeur").notNull(),
  matricule: varchar("matricule", { length: 300 }).notNull(),
  status: varchar("status", { length: 100 }).notNull().default("en_attente"),
});
