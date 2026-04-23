import type { CreateMaintenance, UpdateMaintenance } from "@/@types/types";
import { maintenanceApi } from "@/api/maintenanceApi";

export const useMaintenance = () => {
  const getMaintenances = async () => {
    const { getMaintenances } = maintenanceApi;
    try {
      const maintenances = await getMaintenances();
      return maintenances;
    } catch (error) {
      console.error("Error fetching maintenances:", error);
      throw error;
    }
  };

  const createMaintenance = async (data: CreateMaintenance) => {
    const { createMaintenance } = maintenanceApi;
    try {
      const maintenance = await createMaintenance(data);
      return maintenance;
    } catch (error) {
      console.error("Error creating maintenance:", error);
      throw error;
    }
  };

  const updateMaintenance = async (id: string, data: UpdateMaintenance) => {
    const { updateMaintenance } = maintenanceApi;
    try {
      const maintenance = await updateMaintenance(id, data);
      return maintenance;
    } catch (error) {
      console.error("Error updating maintenance:", error);
      throw error;
    }
  };

  const deleteMaintenance = async (id: string) => {
    const { deleteMaintenance } = maintenanceApi;
    try {
      await deleteMaintenance(id);
      return true;
    } catch (error) {
      console.error("Error deleting maintenance:", error);
      throw error;
    }
  };

  return {
    getMaintenances,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance,
  };
};
