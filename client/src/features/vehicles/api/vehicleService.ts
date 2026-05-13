import type { VehiculePayload } from "@/features/vehicles/types";
import api from "@/shared/lib/axios";

export const vehicleService = {
  getAll: async () => {
    const response = await api.get("/vehicules");
    return response.data;
  },

  getByMatricule: async (matricule: string) => {
    const response = await api.get(`/vehicules/${matricule}`);
    return response.data;
  },

  create: async (data: VehiculePayload) => {
    const response = await api.post("/vehicules", data);
    return response.data;
  },

  update: async (matricule: string, data: Partial<VehiculePayload>) => {
    const response = await api.put(`/vehicules/${matricule}`, data);
    return response.data;
  },

  remove: async (matricule: string) => {
    const response = await api.delete(`/vehicules/${matricule}`);
    return response.data;
  },
};
