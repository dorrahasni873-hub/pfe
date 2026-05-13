import { z } from "zod";

export const affectationSchema = z.object({
  id_affectation: z.string(),
  dateAffectation: z.date(),
  dateDebut: z.date(),
  typeAffectation: z.string(),
  etat: z.string(),
  id_chauffeur: z.string(),
  matricule: z.string(),
});

export type Affectation = z.infer<typeof affectationSchema>;

export const updateAffectationSchema = affectationSchema
  .partial()
  .omit({ id_affectation: true });

export type AffectationPayload = {
  dateAffectation: string;
  dateDebut: string;
  typeAffectation: string;
  etat: string;
  id_chauffeur: string;
  matricule: string;
};

export type UpdateAffectationForm = Affectation;
