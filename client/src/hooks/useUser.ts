import type { User, CreateUser, UpdateUser } from "@/@types/types";
import { userApi } from "@/api/userApi";

export const useUser = () => {
  const createUser = async (data: CreateUser) => {
    try {
      const { createUser } = userApi();
      return await createUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async (): Promise<User[] | undefined> => {
    try {
      const { getUsers } = userApi();
      return await getUsers();
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

  const updateUser = async (id: string, data: UpdateUser) => {
    try {
      const { updateUser } = userApi();
      return await updateUser(id, data);
    } catch (error) {
      console.log(error);
    }
  };

  return { createUser, getUsers, deleteUser, updateUser };
};
