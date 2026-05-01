import { z } from "zod";

export const userSchema = z.object({
  id_utilisateur: z.string(),
  nom: z.string(),
  prenom: z.string(),
  email: z.string().email(),
  motDePasse: z.string().min(6),
  role: z.string(),
  tel: z.string(),
});

export const createUserSchema = userSchema.omit({
  id_utilisateur: true,
});

export const updateUserSchema = createUserSchema.partial();

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

export type RegisterInput = Omit<User, "id_utilisateur" | "role">;
export type LoginInput = Pick<User, "email" | "motDePasse">;

export const chauffeurSchema = z.object({
  id_chauffeur: z.string(),
  nom: z.string(),
  prenom: z.string(),
  cin: z.string(),
  tel: z.string(),
  numeroPermis: z.string(),
  password: z.string(),
  email: z.string().email(),
  role: z.string().optional(),
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
export type loginChauffeur = Pick<Chauffeur, "email" | "password">;
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

export type Entretien = z.infer<typeof entretienSchema>;
export type CreateEntretien = z.infer<typeof createEntretienSchema>;
export type UpdateEntretien = z.infer<typeof updateEntretienSchema>;

export const panneSchema = z.object({
  id_panne: z.string(),
  typePanne: z.string().max(300),
  dateDeclaration: z.string(),
  chauffeurId: z.string(),
});

export const createPanneSchema = panneSchema.omit({
  id_panne: true,
});

export const updatePanneSchema = createPanneSchema.partial();

export type Panne = z.infer<typeof panneSchema>;
export type CreatePanne = z.infer<typeof createPanneSchema>;
export type UpdatePanne = z.infer<typeof updatePanneSchema>;
