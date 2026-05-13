import { z } from "zod";

export const carnetDeBordSchema = z.object({
  id_carnet: z.string(),
  dateDeDebut: z.string(),
  dateDeFin: z.string(),
  km_depart: z.number(),
  km_arrive: z.number(),
  id_chauffeur: z.string(),
  matricule: z.string(),
});

export const createCarnetDeBordSchema = carnetDeBordSchema.omit({
  id_carnet: true,
});

export const updateCarnetDeBordSchema = createCarnetDeBordSchema.partial();

export type CarnetDeBord = z.infer<typeof carnetDeBordSchema>;
export type CreateCarnetDeBord = z.infer<typeof createCarnetDeBordSchema>;
export type UpdateCarnetDeBord = z.infer<typeof updateCarnetDeBordSchema>;
