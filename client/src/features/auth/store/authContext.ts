import type { Chauffeur } from "@/features/drivers/types";
import type { LoginInput, RegisterInput } from "@/features/auth/types";
import type { User } from "@/features/users/types";
import { createContext } from "react";

export type AuthentificationContextType = {
  user: User | Chauffeur | null;
  loading: boolean;
  login: (credentials: LoginInput) => Promise<boolean>;
  register: (credentials: RegisterInput) => Promise<boolean>;
  logout: () => void;
};

export const AuthentificationContext = createContext<AuthentificationContextType | null>(null);
