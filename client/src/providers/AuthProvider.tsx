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

      const storedUser = localStorage.getItem("data");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      try {
        const data = await checkMe();

        const userData = data?.getUser;

        setUser(userData);
        localStorage.setItem("data", JSON.stringify(userData));
      } catch (err) {
        console.log(err);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("data");
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
