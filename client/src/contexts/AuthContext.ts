import type { LoginInput, RegisterInput, User } from "@/@types/types";
import { createContext } from "react";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginInput) => Promise<boolean>;
  register: (credentials: RegisterInput) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
