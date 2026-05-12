import z from "zod";

export const createMaintenanceSchema = z.object({
  matricule: z.string(),
  description: z.string(),
  dateMaintenance: z.string(),
  cout: z.string(),
  kilometrage: z.number(),
  prochainEntretien: z.string(),
  id_utilisateur: z.string(),
});

export const updateMaintenanceSchema = createMaintenanceSchema.partial();
