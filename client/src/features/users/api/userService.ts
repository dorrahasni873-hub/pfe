import type { User, CreateUser, UpdateUser } from "@/shared/types/types";
import api from "@/shared/lib/axios";

export const utilisateurService = () => {
  const createUser = async (data: CreateUser) => {
    try {
      const res = await api.post("/utilisateurs/", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async (): Promise<User[]> => {
    try {
      const res = await api.get("/utilisateurs/");
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await api.delete(`/utilisateurs/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id: string, data: UpdateUser) => {
    try {
      const res = await api.put<{ message: string }>(
        `/utilisateurs/${id}`,
        data,
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { createUser, getUsers, deleteUser, updateUser };
};
