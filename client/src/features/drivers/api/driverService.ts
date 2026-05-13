import type { CreateChauffeur, UpdateChauffeur, Chauffeur } from "@/features/drivers/types";
import api from "@/shared/lib/axios";

export const driverService = {
  getAll: async (): Promise<Chauffeur[]> => {
    const response = await api.get("/chauffeurs");
    return response.data;
  },

  getById: async (id: string): Promise<Chauffeur> => {
    const response = await api.get(`/chauffeurs/${id}`);
    return response.data;
  },

  create: async (data: CreateChauffeur): Promise<Chauffeur> => {
    const response = await api.post("/chauffeurs", data);
    return response.data;
  },

  update: async (id: string, data: UpdateChauffeur): Promise<Chauffeur> => {
    const response = await api.put(`/chauffeurs/${id}`, data);
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/chauffeurs/${id}`);
  },
};
