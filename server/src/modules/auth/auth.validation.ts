import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  motDePasse: z.string(),
  nom: z.string(),
  prenom: z.string(),
  tel: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  motDePasse: z.string(),
});
