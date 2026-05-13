import type { User, CreateUser, UpdateUser } from "@/features/users/types";
import api from "@/shared/lib/axios";

export const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get("/utilisateurs/");
    return response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await api.get(`/utilisateurs/${id}`);
    return response.data;
  },

  create: async (data: CreateUser) => {
    const response = await api.post("/utilisateurs/", data);
    return response.data;
  },

  update: async (id: string, data: UpdateUser) => {
    const response = await api.put(`/utilisateurs/${id}`, data);
    return response.data;
  },

  remove: async (id: string) => {
    const response = await api.delete(`/utilisateurs/${id}`);
    return response.data;
  },
};
