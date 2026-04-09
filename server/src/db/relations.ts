import { relations } from "drizzle-orm";
import { utilisateur, vehicules, maintenance, chauffeur } from "./schema";

export const utilisateurRelations = relations(utilisateur, ({ many }) => ({
  maintenances: many(maintenance),
}));

export const vehiculesRelations = relations(vehicules, ({ many }) => ({
  maintenances: many(maintenance),
}));

export const maintenanceRelations = relations(maintenance, ({ one }) => ({
  utilisateur: one(utilisateur, {
    fields: [maintenance.utilisateurId],
    references: [utilisateur.id],
  }),
  vehicule: one(vehicules, {
    fields: [maintenance.matriculeVehicule],
    references: [vehicules.matricule],
  }),
}));

export const chauffeurRelations = relations(chauffeur, ({ many }) => ({
  vehicules: many(vehicules),
}));
