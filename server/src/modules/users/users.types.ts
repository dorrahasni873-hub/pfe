export interface CreateUserInput {
  nom: string;
  prenom: string;
  email?: string;
  motDePasse: string;
  tel?: string;
  role: string;
}

export type UpdateUserInput = Partial<CreateUserInput>;
