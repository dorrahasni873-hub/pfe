import type { CreateCarnetDeBord, UpdateCarnetDeBord } from "@/shared/types/types";
import api from "@/shared/lib/axios";

export const carnetService = {
  getCarnets: async () => {
    const response = await api.get("/carnetsdebord");
    return response.data;
  },
  getCarnet: async (id: string) => {
    const response = await api.get(`/carnetsdebord/${id}`);
    return response.data;
  },
  createCarnet: async (data: CreateCarnetDeBord) => {
    const response = await api.post("/carnetsdebord", data);
    return response.data;
  },

  updateCarnet: async (id: string, data: UpdateCarnetDeBord) => {
    const response = await api.put(`/carnetsdebord/${id}`, data);
    return response.data;
  },

  deleteCarnet: async (id: string) => {
    const response = await api.delete(`/carnetsdebord/${id}`);
    return response.data;
  },
};
