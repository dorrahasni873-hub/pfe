import {
  pgTable,
  varchar,
  integer,
  date,
  decimal,
  uuid,
} from "drizzle-orm/pg-core";

export const utilisateur = pgTable("utilisateur", {
  id: uuid("id").defaultRandom().primaryKey(),
  nom: varchar("nom", { length: 300 }).notNull(),
  prenom: varchar("prenom", { length: 300 }).notNull(),
  email: varchar("email", { length: 300 }).unique(),
  motDePasse: varchar("mot_de_passe", { length: 300 }).notNull(),
  tel: varchar("tel").unique(),
  role: varchar("role", { length: 300 }).notNull().default("user"),
});

export const vehicules = pgTable("vehicules", {
  matricule: integer("matricule").primaryKey(),
  marqueVoiture: varchar("marque_voiture", { length: 300 }).notNull(),
  dateCirculation: date("date_circulation").notNull(),
  dateVisite: date("date_visite").notNull(),
  dateTaxe: date("date_taxe").notNull(),
  etat: varchar("etat", { length: 100 }).notNull(),
});

export const maintenance = pgTable("maintenance", {
  id: uuid("id").defaultRandom().primaryKey(),
  utilisateurId: varchar("utilisateur_id", { length: 300 }).notNull(),
  matriculeVehicule: integer("matricule_vehicule").notNull(),
  description: varchar("description", { length: 100 }).notNull(),
  dateMaintenance: date("date_maintenance").notNull(),
  cout: decimal("cout", { precision: 10, scale: 2 }).notNull(),
  kilometrage: integer("kilometrage").notNull(),
  prochainEntretien: date("prochain_entretien").notNull(),
});

export const chauffeur = pgTable("chauffeur", {
  id: uuid("id").defaultRandom().primaryKey(),
  nom: varchar("nom", { length: 300 }).notNull(),
  prenom: varchar("prenom", { length: 300 }).notNull(),
  cin: varchar("cin").unique(),
  tel: varchar("tel").unique(),
  numeroPermis: varchar("numero_permis").unique(),
});
