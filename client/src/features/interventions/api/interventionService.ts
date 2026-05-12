import type { CreateEntretien, UpdateEntretien } from "@/shared/types/types";
import api from "@/shared/lib/axios";

export const entretienService = {
  getEntretiens: async () => {
    const response = await api.get("/entretiens");
    return response.data;
  },

  getEntretien: async (id: string) => {
    const response = await api.get(`/entretiens/${id}`);
    return response.data;
  },

  createEntretien: async (data: CreateEntretien) => {
    const response = await api.post("/entretiens", data);
    return response.data;
  },

  updateEntretien: async (id: string, data: UpdateEntretien) => {
    const response = await api.put(`/entretiens/${id}`, data);
    return response.data;
  },

  deleteEntretien: async (id: string) => {
    const response = await api.delete(`/entretiens/${id}`);
    return response.data;
  },
};
