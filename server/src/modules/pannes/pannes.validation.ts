import { z } from "zod";

export const panneSchema = z.object({
  id_panne: z.string(),
  typePanne: z.string().max(300),
  dateDeclaration: z.string(),
  chauffeurId: z.string(),
  matricule: z.string(),
  status: z.string().default("en_attente"),
});

export const createPanneSchema = panneSchema.omit({
  id_panne: true,
});

export const updatePanneSchema = createPanneSchema.partial();
