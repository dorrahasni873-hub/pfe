import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const utilisateur = pgTable("utilisateur", {
  id_utilisateur: uuid("id_utilisateur").defaultRandom().primaryKey(),
  nom: varchar("nom", { length: 300 }).notNull(),
  prenom: varchar("prenom", { length: 300 }).notNull(),
  email: varchar("email", { length: 300 }).unique(),
  motDePasse: varchar("mot_de_passe", { length: 300 }).notNull(),
  tel: varchar("tel").unique(),
  role: varchar("role", { length: 300 }).notNull().default("user"),
});
