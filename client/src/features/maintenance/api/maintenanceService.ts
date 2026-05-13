import type { CreateMaintenance, UpdateMaintenance, Maintenance } from "@/features/maintenance/types";
import api from "@/shared/lib/axios";

export const maintenanceService = {
  getAll: async (): Promise<Maintenance[]> => {
    const response = await api.get("/maintenances");
    return response.data;
  },

  getById: async (id: string): Promise<Maintenance> => {
    const response = await api.get(`/maintenances/${id}`);
    return response.data;
  },

  create: async (data: CreateMaintenance): Promise<Maintenance> => {
    const response = await api.post("/maintenances", data);
    return response.data;
  },

  update: async (id: string, data: UpdateMaintenance): Promise<Maintenance> => {
    const response = await api.put(`/maintenances/${id}`, data);
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/maintenances/${id}`);
  },
};
