import { z } from "zod";

export const VehiculeSchema = z.object({
  matricule: z.string(),
  marque: z.string(),
  dateCirculation: z.date(),
  dateVisite: z.date(),
  dateTaxe: z.date(),
  etat: z.string(),
});

export type Vehicule = z.infer<typeof VehiculeSchema>;

export const updateVehiculeSchema = VehiculeSchema.partial().omit({
  matricule: true,
});

export type VehiculePayload = {
  matricule: string;
  marque: string;
  dateCirculation: string;
  dateVisite: string;
  dateTaxe: string;
  etat: string;
};

export type UpdateVehicule = VehiculePayload;
