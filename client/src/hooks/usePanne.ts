import type { CreatePanne, UpdatePanne } from "@/@types/types";
import { panneApi } from "@/api/panneApi";

export const usePanne = () => {
  const getPannes = async () => {
    try {
      return await panneApi.getPannes();
    } catch (error) {
      console.error("Error fetching pannes:", error);
      throw error;
    }
  };

  const getPanne = async (id: string) => {
    try {
      return await panneApi.getPanne(id);
    } catch (error) {
      console.error("Error fetching panne:", error);
      throw error;
    }
  };

  const createPanne = async (data: CreatePanne) => {
    try {
      return await panneApi.createPanne(data);
    } catch (error) {
      console.error("Error creating panne:", error);
      throw error;
    }
  };

  const updatePanne = async (id: string, data: UpdatePanne) => {
    try {
      return await panneApi.updatePanne(id, data);
    } catch (error) {
      console.error("Error updating panne:", error);
      throw error;
    }
  };

  const deletePanne = async (id: string) => {
    try {
      await panneApi.deletePanne(id);
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
