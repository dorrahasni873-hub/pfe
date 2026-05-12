import type { CreateMaintenance, UpdateMaintenance } from "@/shared/types/types";
import api from "@/shared/lib/axios";

export const maintenanceService = {
  getMaintenances: async () => {
    const response = await api.get("/maintenances");
    return response.data;
  },

  createMaintenance: async (data: CreateMaintenance) => {
    const response = await api.post("/maintenances", data);
    return response.data;
  },

  updateMaintenance: async (id: string, data: UpdateMaintenance) => {
    const response = await api.put(`/maintenances/${id}`, data);
    return response.data;
  },

  deleteMaintenance: async (id: string) => {
    const response = await api.delete(`/maintenances/${id}`);
    return response.data;
  },
};
