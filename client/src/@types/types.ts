import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  nom: z.string(),
  prenom: z.string(),
  email: z.string().email(),
  motDePasse: z.string().min(6),
  role: z.string().optional(),
  tel: z.string(),
});

export const NewUserSchema = UserSchema.omit({ id: true, role: true });

export type User = z.infer<typeof UserSchema>;
export type RegisterInput = Omit<User, "id" | "role">;
export type LoginInput = Pick<User, "email" | "motDePasse">;

export const chauffeurSchema = z.object({
  id: z.string().optional(),
  nom: z.string(),
  prenom: z.string(),
  cin: z.string(),
  tel: z.string(),
  numeroPermis: z.string(),
});

export type Chauffeur = z.infer<typeof chauffeurSchema>;

export const updateChauffeurSchema = chauffeurSchema
  .partial()
  .omit({ id: true });
export type UpdateChauffeur = z.infer<typeof updateChauffeurSchema>;
