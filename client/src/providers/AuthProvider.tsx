import React, { useEffect, useMemo, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { authApi } from "@/api/authApi";
import type { LoginInput, RegisterInput } from "@/@types/types";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loginApi, registerApi, checkMe } = useMemo(() => authApi(), []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await checkMe();
        setUser(data?.user || null);
      } catch (err) {
        console.log(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [checkMe]);

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
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
