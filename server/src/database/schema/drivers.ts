import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const chauffeur = pgTable("chauffeur", {
  id_chauffeur: uuid("id_chauffeur").defaultRandom().primaryKey(),
  nom: varchar("nom", { length: 300 }).notNull(),
  prenom: varchar("prenom", { length: 300 }).notNull(),
  cin: varchar("cin").unique(),
  tel: varchar("tel").unique(),
  numeroPermis: varchar("numero_permis").unique(),
  password: varchar("password", { length: 300 }).notNull(),
  email: varchar("email", { length: 300 }).unique(),
});
