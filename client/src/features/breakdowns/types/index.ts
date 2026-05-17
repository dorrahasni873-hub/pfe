import { z } from "zod";

export const panneSchema = z.object({
  id_panne: z.string(),
  typePanne: z.string().max(300),
  dateDeclaration: z.string(),
  chauffeurId: z.string(),
  matricule: z.string(),
  maintenanceId: z.string().optional(),
});

export const createPanneSchema = panneSchema.omit({
  id_panne: true,
});

export const updatePanneSchema = createPanneSchema.partial();

export type Panne = z.infer<typeof panneSchema>;
export type CreatePanne = z.infer<typeof createPanneSchema>;
export type UpdatePanne = z.infer<typeof updatePanneSchema>;
