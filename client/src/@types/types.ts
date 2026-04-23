import { z } from "zod";

export const UserSchema = z.object({
  id_utilisateur: z.string(),
  nom: z.string(),
  prenom: z.string(),
  email: z.string().email(),
  motDePasse: z.string().min(6),
  role: z.string().optional(),
  tel: z.string(),
});

export const NewUserSchema = UserSchema.omit({ id_utilisateur: true });

export type User = z.infer<typeof UserSchema>;
export type RegisterInput = Omit<User, "id_utilisateur" | "role">;
export type LoginInput = Pick<User, "email" | "motDePasse">;

export const chauffeurSchema = z.object({
  id_chauffeur: z.string(),
  nom: z.string(),
  prenom: z.string(),
  cin: z.string(),
  tel: z.string(),
  numeroPermis: z.string(),
});

export type Chauffeur = z.infer<typeof chauffeurSchema>;

export const VehiculeSchema = z.object({
  matricule: z.string(),
  marqueVoiture: z.string(),
  dateCirculation: z.date(),
  dateVisite: z.date(),
  dateTaxe: z.date(),
  etat: z.string(),
});

export type Vehicule = z.infer<typeof VehiculeSchema>;

export const updateVehiculeSchema = VehiculeSchema.partial().omit({
  matricule: true,
});

export const createChauffeurSchema = chauffeurSchema.omit({
  id_chauffeur: true,
});

export const updateChauffeurSchema = createChauffeurSchema.partial();

export type CreateChauffeur = z.infer<typeof createChauffeurSchema>;
export type UpdateChauffeur = z.infer<typeof updateChauffeurSchema>;

export type VehiculePayload = {
  matricule: string;
  marqueVoiture: string;
  dateCirculation: string;
  dateVisite: string;
  dateTaxe: string;
  etat: string;
};

export type UpdateVehicule = VehiculePayload;

export const affectationSchema = z.object({
  id_affectation: z.string(),
  dateAffectation: z.date(),
  dateDebut: z.date(),
  typeAffectation: z.string(),
  etat: z.string(),
  id_chauffeur: z.string(),
  matricule: z.string(),
});

export type Affectation = z.infer<typeof affectationSchema>;

export const updateAffectationSchema = affectationSchema
  .partial()
  .omit({ id_affectation: true });

export type AffectationPayload = {
  dateAffectation: string;
  dateDebut: string;
  typeAffectation: string;
  etat: string;
  id_chauffeur: string;
  matricule: string;
};

export type UpdateAffectationForm = Affectation;

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
