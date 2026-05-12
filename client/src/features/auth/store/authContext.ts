import type {
  Chauffeur,
  LoginInput,
  RegisterInput,
  User,
} from "@/shared/types/types";
import { createContext } from "react";

export type AuthentificationContextType = {
  user: User | Chauffeur | null;
  loading: boolean;
  login: (credentials: LoginInput) => Promise<boolean>;
  register: (credentials: RegisterInput) => Promise<boolean>;
  logout: () => void;
};

export const AuthentificationContext = createContext<AuthentificationContextType | null>(null);
