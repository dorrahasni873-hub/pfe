import React, { useEffect, useMemo, useState } from "react";
import { AuthentificationContext } from "@/features/auth/store/authContext";
import { authentificationService } from "@/features/auth/api/authService";
import type { LoginInput, RegisterInput } from "@/shared/types/types";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthentificationProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loginApi, registerApi, checkMe } = useMemo(() => authentificationService(), []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const data = await checkMe();
        const userData = data?.user;

        setUser(userData);
        localStorage.setItem("data", JSON.stringify(userData));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const login = async ({ email, motDePasse }: LoginInput) => {
    const data = await loginApi(email, motDePasse);

    if (data && data.user) {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      return true;
    }
    return false;
  };

  const register = async ({
    email,
    motDePasse,
    nom,
    prenom,
    tel,
  }: RegisterInput) => {
    const data = await registerApi(email, motDePasse, nom, prenom, tel);
    if (data) return true;
    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthentificationContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthentificationContext.Provider>
  );
};
