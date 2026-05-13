import type { User } from "@/features/users/types";

export type RegisterInput = Omit<User, "id_utilisateur" | "role">;
export type LoginInput = Pick<User, "email" | "motDePasse">;
