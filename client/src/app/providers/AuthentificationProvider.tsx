import React, { useEffect, useState } from "react";
import { AuthentificationContext } from "@/features/auth/store/authContext";
import { authService } from "@/features/auth/api/authService";
import type { LoginInput, RegisterInput } from "@/features/auth/types";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthentificationProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { login: loginApi, register: registerApi, checkMe } = authService;

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
    try {
      const data = await loginApi(email, motDePasse);

      if (data && data.user) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        return true;
      }
      return false;
    } catch {
      return false;
    }
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

  const refreshUser = async () => {
    try {
      const data = await checkMe();
      const userData = data?.user;
      if (userData) {
        setUser(userData);
        localStorage.setItem("data", JSON.stringify(userData));
      }
    } catch {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("data");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthentificationContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthentificationContext.Provider>
  );
};
