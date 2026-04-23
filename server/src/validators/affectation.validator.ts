import z from "zod";

export const createAffectationSchema = z.object({
  id_affectation: z.string().optional(),
  dateAffectation: z.string(),
  dateDebut: z.string(),
  typeAffectation: z.string(),
  etat: z.string(),
  id_chauffeur: z.string(),
  matricule: z.string(),
});

export const updateAffectationSchema = createAffectationSchema.partial();
