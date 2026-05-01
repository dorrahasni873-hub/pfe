import type { CreatePanne, UpdatePanne } from "@/@types/types";
import api from "./axios";

export const panneApi = {
  getPannes: async () => {
    const response = await api.get("/pannes");
    return response.data;
  },

  getPanne: async (id: string) => {
    const response = await api.get(`/pannes/${id}`);
    return response.data;
  },
  createPanne: async (data: CreatePanne) => {
    const response = await api.post("/pannes", data);
    return response.data;
  },

  updatePanne: async (id: string, data: UpdatePanne) => {
    const response = await api.put(`/pannes/${id}`, data);
    return response.data;
  },

  deletePanne: async (id: string) => {
    const response = await api.delete(`/pannes/${id}`);
    return response.data;
  },
};
