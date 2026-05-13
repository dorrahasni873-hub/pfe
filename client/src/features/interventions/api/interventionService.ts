import type { CreateEntretien, UpdateEntretien, Entretien } from "@/features/interventions/types";
import api from "@/shared/lib/axios";

export const interventionService = {
  getAll: async (): Promise<Entretien[]> => {
    const response = await api.get("/entretiens");
    return response.data;
  },

  getById: async (id: string): Promise<Entretien> => {
    const response = await api.get(`/entretiens/${id}`);
    return response.data;
  },

  create: async (data: CreateEntretien): Promise<Entretien> => {
    const response = await api.post("/entretiens", data);
    return response.data;
  },

  update: async (id: string, data: UpdateEntretien): Promise<Entretien> => {
    const response = await api.put(`/entretiens/${id}`, data);
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/entretiens/${id}`);
  },
};
