import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  motDePasse: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  nom: z.string(),
  prenom: z.string(),
  tel: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  motDePasse: z.string(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères"),
});
