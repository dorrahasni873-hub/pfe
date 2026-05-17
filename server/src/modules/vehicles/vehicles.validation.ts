import { z } from "zod";

export const createVehicleSchema = z.object({
  matricule: z.string(),
  marque: z.string(),
  dateCirculation: z.string(),
  dateVisite: z.string(),
  dateTaxe: z.string(),
  etat: z.string(),
});
