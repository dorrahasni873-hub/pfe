import type { RegisterInput, User } from "@/@types/types";
import api from "@/api/axios";
import { userApi } from "@/api/userApi";

export const useUser = () => {
  const createUser = async ({
    nom,
    prenom,
    email,
    motDePasse,
    tel,
  }: RegisterInput) => {
    try {
      const { createUser } = userApi();
      const res = await createUser(nom, prenom, email, motDePasse, tel);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async (): Promise<User[] | undefined> => {
    try {
      const res = await api.get<{ message: string; data: User[] }>("/users");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const { deleteUser } = userApi();
      const res = await deleteUser(id);
      return res?.message ?? "User deleted";
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id: string, data: RegisterInput) => {
    console.log("data from userHook", data);

    try {
      const { updateUser } = userApi();
      const res = await updateUser(id, data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return { createUser, getUsers, deleteUser, updateUser };
};
