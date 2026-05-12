import type { CreateCarnetDeBord, UpdateCarnetDeBord } from "@/shared/types/types";
import { carnetService } from "@/features/logbooks/api/logbookService";

export const useCarnetDeBord = () => {
  const getCarnets = async () => {
    try {
      return await carnetService.getCarnets();
    } catch (error) {
      console.error("Error fetching carnets:", error);
      throw error;
    }
  };

  const getCarnet = async (id: string) => {
    try {
      return await carnetService.getCarnet(id);
    } catch (error) {
      console.error("Error fetching carnet:", error);
      throw error;
    }
  };

  const createCarnet = async (data: CreateCarnetDeBord) => {
    try {
      return await carnetService.createCarnet(data);
    } catch (error) {
      console.error("Error creating carnet:", error);
      throw error;
    }
  };

  const updateCarnet = async (id: string, data: UpdateCarnetDeBord) => {
    try {
      return await carnetService.updateCarnet(id, data);
    } catch (error) {
      console.error("Error updating carnet:", error);
      throw error;
    }
  };

  const deleteCarnet = async (id: string) => {
    try {
      await carnetService.deleteCarnet(id);
      return true;
    } catch (error) {
      console.error("Error deleting carnet:", error);
      throw error;
    }
  };

  return {
    getCarnets,
    getCarnet,
    createCarnet,
    updateCarnet,
    deleteCarnet,
  };
};
