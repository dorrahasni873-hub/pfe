import { relations } from "drizzle-orm";
import {
  utilisateur,
  vehicules,
  maintenance,
  chauffeur,
  panne,
  affectation,
} from "./schema";

export const utilisateurRelations = relations(utilisateur, ({ many }) => ({
  maintenances: many(maintenance),
}));

export const vehiculesRelations = relations(vehicules, ({ many }) => ({
  maintenances: many(maintenance),
  affectations: many(affectation),
}));

export const maintenanceRelations = relations(maintenance, ({ one }) => ({
  utilisateur: one(utilisateur, {
    fields: [maintenance.id_utilisateur],
    references: [utilisateur.id_utilisateur],
  }),
  vehicule: one(vehicules, {
    fields: [maintenance.matricule],
    references: [vehicules.matricule],
  }),
}));

export const affectationRelations = relations(affectation, ({ one }) => ({
  chauffeur: one(chauffeur, {
    fields: [affectation.id_chauffeur],
    references: [chauffeur.id_chauffeur],
  }),
  vehicule: one(vehicules, {
    fields: [affectation.matricule],
    references: [vehicules.matricule],
  }),
}));

export const chauffeurRelations = relations(chauffeur, ({ many }) => ({
  affectations: many(affectation),
}));
