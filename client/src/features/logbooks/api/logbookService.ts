import type { CreateCarnetDeBord, UpdateCarnetDeBord, CarnetDeBord } from "@/features/logbooks/types";
import api from "@/shared/lib/axios";

export const logbookService = {
  getAll: async (): Promise<CarnetDeBord[]> => {
    const response = await api.get("/carnetsdebord");
    return response.data;
  },

  getById: async (id: string): Promise<CarnetDeBord> => {
    const response = await api.get(`/carnetsdebord/${id}`);
    return response.data;
  },

  create: async (data: CreateCarnetDeBord): Promise<CarnetDeBord> => {
    const response = await api.post("/carnetsdebord", data);
    return response.data;
  },

  update: async (id: string, data: UpdateCarnetDeBord): Promise<CarnetDeBord> => {
    const response = await api.put(`/carnetsdebord/${id}`, data);
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/carnetsdebord/${id}`);
  },
};
