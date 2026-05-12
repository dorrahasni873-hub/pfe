import type { CreateEntretien, UpdateEntretien } from "@/shared/types/types";
import { entretienService } from "@/features/interventions/api/interventionService";

export const useEntretien = () => {
  const getEntretiens = async () => {
    try {
      return await entretienService.getEntretiens();
    } catch (error) {
      console.error("Error fetching entretiens:", error);
      throw error;
    }
  };

  const getEntretien = async (id: string) => {
    try {
      return await entretienService.getEntretien(id);
    } catch (error) {
      console.error("Error fetching entretien:", error);
      throw error;
    }
  };

  const createEntretien = async (data: CreateEntretien) => {
    try {
      return await entretienService.createEntretien(data);
    } catch (error) {
      console.error("Error creating entretien:", error);
      throw error;
    }
  };

  const updateEntretien = async (id: string, data: UpdateEntretien) => {
    try {
      return await entretienService.updateEntretien(id, data);
    } catch (error) {
      console.error("Error updating entretien:", error);
      throw error;
    }
  };

  const deleteEntretien = async (id: string) => {
    try {
      await entretienService.deleteEntretien(id);
      return true;
    } catch (error) {
      console.error("Error deleting entretien:", error);
      throw error;
    }
  };

  return {
    getEntretiens,
    getEntretien,
    createEntretien,
    updateEntretien,
    deleteEntretien,
  };
};
