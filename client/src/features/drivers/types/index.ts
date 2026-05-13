import { z } from "zod";

export const chauffeurSchema = z.object({
  id_chauffeur: z.string(),
  nom: z.string(),
  prenom: z.string(),
  cin: z.string(),
  tel: z.string(),
  numeroPermis: z.string(),
  password: z.string(),
  email: z.string().email(),
  role: z.string().optional(),
});

export type Chauffeur = z.infer<typeof chauffeurSchema>;

export const createChauffeurSchema = chauffeurSchema.omit({
  id_chauffeur: true,
});

export const updateChauffeurSchema = createChauffeurSchema.partial();

export type CreateChauffeur = z.infer<typeof createChauffeurSchema>;
export type UpdateChauffeur = z.infer<typeof updateChauffeurSchema>;
