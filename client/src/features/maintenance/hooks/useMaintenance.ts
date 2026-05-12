import type { CreateMaintenance, UpdateMaintenance } from "@/shared/types/types";
import { maintenanceService } from "@/features/maintenance/api/maintenanceService";

export const useMaintenance = () => {
  const getMaintenances = async () => {
    const { getMaintenances } = maintenanceService;
    try {
      const maintenances = await getMaintenances();
      return maintenances;
    } catch (error) {
      console.error("Error fetching maintenances:", error);
      throw error;
    }
  };

  const createMaintenance = async (data: CreateMaintenance) => {
    const { createMaintenance } = maintenanceService;
    try {
      const maintenance = await createMaintenance(data);
      return maintenance;
    } catch (error) {
      console.error("Error creating maintenance:", error);
      throw error;
    }
  };

  const updateMaintenance = async (id: string, data: UpdateMaintenance) => {
    const { updateMaintenance } = maintenanceService;
    try {
      const maintenance = await updateMaintenance(id, data);
      return maintenance;
    } catch (error) {
      console.error("Error updating maintenance:", error);
      throw error;
    }
  };

  const deleteMaintenance = async (id: string) => {
    const { deleteMaintenance } = maintenanceService;
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
