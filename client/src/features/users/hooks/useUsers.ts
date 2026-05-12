import type { User, CreateUser, UpdateUser } from "@/shared/types/types";
import { utilisateurService } from "@/features/users/api/userService";

export const useUtilisateur = () => {
  const createUser = async (data: CreateUser) => {
    try {
      const { createUser } = utilisateurService();
      return await createUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async (): Promise<User[] | undefined> => {
    try {
      const { getUsers } = utilisateurService();
      return await getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const { deleteUser } = utilisateurService();
      const res = await deleteUser(id);
      return res?.message ?? "User deleted";
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id: string, data: UpdateUser) => {
    try {
      const { updateUser } = utilisateurService();
      return await updateUser(id, data);
    } catch (error) {
      console.log(error);
    }
  };

  return { createUser, getUsers, deleteUser, updateUser };
};
