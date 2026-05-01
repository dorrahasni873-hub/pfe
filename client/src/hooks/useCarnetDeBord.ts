import type { CreateCarnetDeBord, UpdateCarnetDeBord } from "@/@types/types";
import { carnetApi } from "@/api/carnetApi";

export const useCarnetDeBord = () => {
  const getCarnets = async () => {
    try {
      return await carnetApi.getCarnets();
    } catch (error) {
      console.error("Error fetching carnets:", error);
      throw error;
    }
  };

  const getCarnet = async (id: string) => {
    try {
      return await carnetApi.getCarnet(id);
    } catch (error) {
      console.error("Error fetching carnet:", error);
      throw error;
    }
  };

  const createCarnet = async (data: CreateCarnetDeBord) => {
    try {
      return await carnetApi.createCarnet(data);
    } catch (error) {
      console.error("Error creating carnet:", error);
      throw error;
    }
  };

  const updateCarnet = async (id: string, data: UpdateCarnetDeBord) => {
    try {
      return await carnetApi.updateCarnet(id, data);
    } catch (error) {
      console.error("Error updating carnet:", error);
      throw error;
    }
  };

  const deleteCarnet = async (id: string) => {
    try {
      await carnetApi.deleteCarnet(id);
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
