import z from "zod";

export const createChauffeurSchema = z.object({
  nom: z.string(),
  prenom: z.string(),
  cin: z.string().optional(),
  tel: z.string().optional(),
  numeroPermis: z.string().optional(),
});

export const updateChauffeurSchema = createChauffeurSchema.partial();
