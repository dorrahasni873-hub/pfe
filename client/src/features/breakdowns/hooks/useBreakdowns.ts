import type { CreatePanne, UpdatePanne } from "@/shared/types/types";
import { panneService } from "@/features/breakdowns/api/breakdownService";

export const usePanne = () => {
  const getPannes = async () => {
    try {
      return await panneService.getPannes();
    } catch (error) {
      console.error("Error fetching pannes:", error);
      throw error;
    }
  };

  const getPanne = async (id: string) => {
    try {
      return await panneService.getPanne(id);
    } catch (error) {
      console.error("Error fetching panne:", error);
      throw error;
    }
  };

  const createPanne = async (data: CreatePanne) => {
    try {
      return await panneService.createPanne(data);
    } catch (error) {
      console.error("Error creating panne:", error);
      throw error;
    }
  };

  const updatePanne = async (id: string, data: UpdatePanne) => {
    try {
      return await panneService.updatePanne(id, data);
    } catch (error) {
      console.error("Error updating panne:", error);
      throw error;
    }
  };

  const deletePanne = async (id: string) => {
    try {
      await panneService.deletePanne(id);
      return true;
    } catch (error) {
      console.error("Error deleting panne:", error);
      throw error;
    }
  };

  return {
    getPannes,
    getPanne,
    createPanne,
    updatePanne,
    deletePanne,
  };
};
