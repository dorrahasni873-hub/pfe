import type { CreateCarnetDeBord, UpdateCarnetDeBord } from "@/@types/types";
import api from "./axios";

export const carnetApi = {
  getCarnets: async () => {
    const response = await api.get("/carnets");
    return response.data;
  },
  getCarnet: async (id: string) => {
    const response = await api.get(`/carnets/${id}`);
    return response.data;
  },
  createCarnet: async (data: CreateCarnetDeBord) => {
    const response = await api.post("/carnets", data);
    return response.data;
  },

  updateCarnet: async (id: string, data: UpdateCarnetDeBord) => {
    const response = await api.put(`/carnets/${id}`, data);
    return response.data;
  },

  deleteCarnet: async (id: string) => {
    const response = await api.delete(`/carnets/${id}`);
    return response.data;
  },
};
