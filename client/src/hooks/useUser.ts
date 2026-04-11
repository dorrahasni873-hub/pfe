import type { RegisterInput, User } from "@/@types/types";
import { userApi } from "@/api/userApi";

export const useUser = () => {
  const createUser = async (data: User) => {
    try {
      const { createUser } = userApi();
      const res = await createUser(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async (): Promise<User[] | undefined> => {
    try {
      const { getUsers } = userApi();
      const res = await getUsers();
      return res;
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
