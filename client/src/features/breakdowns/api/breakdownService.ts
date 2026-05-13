import type { CreatePanne, UpdatePanne, Panne } from "@/features/breakdowns/types";
import api from "@/shared/lib/axios";

export const breakdownService = {
  getAll: async (): Promise<Panne[]> => {
    const response = await api.get("/pannes");
    return response.data;
  },

  getById: async (id: string): Promise<Panne> => {
    const response = await api.get(`/pannes/${id}`);
    return response.data;
  },

  create: async (data: CreatePanne): Promise<Panne> => {
    const response = await api.post("/pannes", data);
    return response.data;
  },

  update: async (id: string, data: UpdatePanne): Promise<Panne> => {
    const response = await api.put(`/pannes/${id}`, data);
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/pannes/${id}`);
  },
};
