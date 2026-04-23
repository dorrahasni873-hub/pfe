import {
  pgTable,
  varchar,
  integer,
  date,
  decimal,
  uuid,
} from "drizzle-orm/pg-core";

export const utilisateur = pgTable("utilisateur", {
  id_utilisateur: uuid("id_utilisateur").defaultRandom().primaryKey(),
  nom: varchar("nom", { length: 300 }).notNull(),
  prenom: varchar("prenom", { length: 300 }).notNull(),
  email: varchar("email", { length: 300 }).unique(),
  motDePasse: varchar("mot_de_passe", { length: 300 }).notNull(),
  tel: varchar("tel").unique(),
  role: varchar("role", { length: 300 }).notNull().default("user"),
});

export const vehicules = pgTable("vehicules", {
  matricule: varchar("matricule", { length: 300 }).primaryKey(),
  marqueVoiture: varchar("marque_voiture", { length: 300 }).notNull(),
  dateCirculation: date("date_circulation").notNull(),
  dateVisite: date("date_visite").notNull(),
  dateTaxe: date("date_taxe").notNull(),
  etat: varchar("etat", { length: 100 }).notNull(),
});

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

export const chauffeur = pgTable("chauffeur", {
  id_chauffeur: uuid("id_chauffeur").defaultRandom().primaryKey(),
  nom: varchar("nom", { length: 300 }).notNull(),
  prenom: varchar("prenom", { length: 300 }).notNull(),
  cin: varchar("cin").unique(),
  tel: varchar("tel").unique(),
  numeroPermis: varchar("numero_permis").unique(),
});

export const panne = pgTable("panne", {
  id_panne: uuid("id_panne").defaultRandom().primaryKey(),
  typePanne: varchar("type_panne", { length: 300 }).notNull(),
  dateDeclaration: date("date_declaration").notNull(),
  chauffeurId: uuid("id_chauffeur").notNull(),
  maintenanceId: uuid("maintenance_id").notNull(),
});

export const entretien = pgTable("entretien", {
  id_entretien: uuid("id_entretien").defaultRandom().primaryKey(),
  dateEntretien: date("date_entretien").notNull(),
  typeIntervention: varchar("type_intervention", { length: 300 }).notNull(),
  descriptionIntervention: varchar("description_intervention", {
    length: 300,
  }).notNull(),
  etat: varchar("etat", { length: 100 }).notNull(),
  matricule: varchar("matricule", { length: 300 }).notNull(),
  maintenanceId: uuid("maintenance_id").notNull(),
});

export const affectation = pgTable("affectation", {
  id_affectation: uuid("id_affectation").defaultRandom().primaryKey(),
  dateAffectation: date("date_affectation").notNull(),
  dateDebut: date("date_debut").notNull(),
  typeAffectation: varchar("type_affectation", { length: 300 }).notNull(),
  etat: varchar("etat", { length: 100 }).notNull(),
  id_chauffeur: uuid("id_chauffeur").notNull(),
  matricule: varchar("matricule", { length: 300 }).notNull(),
});
