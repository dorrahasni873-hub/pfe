import { z } from "zod";

export const entretienSchema = z.object({
  id_entretien: z.string(),
  dateEntretien: z.string(),
  typeIntervention: z.string(),
  descriptionIntervention: z.string(),
  etat: z.string(),
  matricule: z.string(),
  maintenanceId: z.string(),
  panneId: z.string(),
});

export const createEntretienSchema = entretienSchema.omit({
  id_entretien: true,
});

export const updateEntretienSchema = createEntretienSchema.partial();
