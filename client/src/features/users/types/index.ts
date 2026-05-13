import { z } from "zod";

export const userSchema = z.object({
  id_utilisateur: z.string(),
  nom: z.string(),
  prenom: z.string(),
  email: z.string().email(),
  motDePasse: z.string().min(6),
  role: z.string(),
  tel: z.string(),
});

export const createUserSchema = userSchema.omit({
  id_utilisateur: true,
});

export const updateUserSchema = createUserSchema.partial();

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
