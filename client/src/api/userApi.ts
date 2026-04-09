import type { RegisterInput, User } from "@/@types/types";
import api from "./axios";

export const userApi = () => {
  const createUser = async (
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    tel: string,
  ) => {
    try {
      const res = await api.post("/users/", {
        nom,
        prenom,
        email,
        motDePasse,
        tel,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getUsers = async () => {
    try {
      const res = await api.get<User[]>("/users/", { withCredentials: true });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await api.delete<{ message: string }>(`/users/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id: string, data: RegisterInput) => {
    try {
      const res = await api.put<{ message: string }>(`/users/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { createUser, getUsers, deleteUser, updateUser };
};
