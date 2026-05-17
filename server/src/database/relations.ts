import { relations } from "drizzle-orm";
import { utilisateur, vehicules, maintenance, chauffeur, panne, affectation, entretien, carnetDeBord } from "./schema";

export const utilisateurRelations = relations(utilisateur, ({ many }) => ({
  maintenances: many(maintenance),
}));

export const vehiculesRelations = relations(vehicules, ({ many }) => ({
  maintenances: many(maintenance),
  affectations: many(affectation),
}));

export const maintenanceRelations = relations(maintenance, ({ one, many }) => ({
  utilisateur: one(utilisateur, {
    fields: [maintenance.id_utilisateur],
    references: [utilisateur.id_utilisateur],
  }),
  vehicule: one(vehicules, {
    fields: [maintenance.matricule],
    references: [vehicules.matricule],
  }),
  pannes: many(panne),
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
  pannes: many(panne),
}));

export const panneRelations = relations(panne, ({ one }) => ({
  chauffeur: one(chauffeur, {
    fields: [panne.chauffeurId],
    references: [chauffeur.id_chauffeur],
  }),
  vehicule: one(vehicules, {
    fields: [panne.matricule],
    references: [vehicules.matricule],
  }),
  maintenance: one(maintenance, {
    fields: [panne.maintenanceId],
    references: [maintenance.id_maintenance],
  }),
}));

export const entretienRelations = relations(entretien, ({ one }) => ({
  vehicule: one(vehicules, {
    fields: [entretien.matricule],
    references: [vehicules.matricule],
  }),

  maintenance: one(maintenance, {
    fields: [entretien.maintenanceId],
    references: [maintenance.id_maintenance],
  }),

  panne: one(panne, {
    fields: [entretien.panneId],
    references: [panne.id_panne],
  }),
}));

export const carnetDeBordRelations = relations(carnetDeBord, ({ one }) => ({
  chauffeur: one(chauffeur, {
    fields: [carnetDeBord.id_chauffeur],
    references: [chauffeur.id_chauffeur],
  }),
  vehicule: one(vehicules, {
    fields: [carnetDeBord.matricule],
    references: [vehicules.matricule],
  }),
}));
