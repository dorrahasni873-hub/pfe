import { z } from "zod";

export const MaintenanceSchema = z.object({
  id_maintenance: z.string(),
  matricule: z.string(),
  description: z.string(),
  dateMaintenance: z.string(),
  cout: z.string(),
  kilometrage: z.number(),
  prochainEntretien: z.string(),
  id_utilisateur: z.string(),
});

export type Maintenance = z.infer<typeof MaintenanceSchema>;

export const createMaintenanceSchema = MaintenanceSchema.omit({
  id_maintenance: true,
});

export type CreateMaintenance = z.infer<typeof createMaintenanceSchema>;

export const updateMaintenanceSchema = createMaintenanceSchema.partial();
export type UpdateMaintenance = z.infer<typeof updateMaintenanceSchema>;
