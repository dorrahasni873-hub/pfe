import type { CreateChauffeur, UpdateChauffeur } from "@/shared/types/types";
import api from "@/shared/lib/axios";

export const chauffeurService = {
  getChauffeurs: async () => {
    const response = await api.get("/chauffeurs");

    return response.data;
  },
  createChauffeur: async (data: CreateChauffeur) => {
    const response = await api.post("/chauffeurs", data);
    return response.data;
  },
  updateChauffeur: async (id: string, data: UpdateChauffeur) => {
    const response = await api.put(`/chauffeurs/${id}`, data);
    return response.data;
  },
  deleteChauffeur: async (id: string) => {
    const response = await api.delete(`/chauffeurs/${id}`);
    return response.data;
  },
};
