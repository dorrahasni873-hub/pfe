import type {
   CreateChauffeur,
  UpdateChauffeur,
} from "@/shared/types/types";
import { chauffeurService } from "@/features/drivers/api/driverService";

export const useChauffeur = () => {
  const getChauffeurs = async () => {
    const { getChauffeurs } = chauffeurService;
    try {
      const chauffeurs = await getChauffeurs();
      return chauffeurs;
    } catch (error) {
      console.error("Error fetching chauffeurs:", error);
      throw error;
    }
  };

  const createChauffeur = async (data: CreateChauffeur) => {
    const { createChauffeur } = chauffeurService;
    try {
      const chauffeur = await createChauffeur(data);
      return chauffeur;
    } catch (error) {
      console.error("Error creating chauffeur:", error);
      throw error;
    }
  };

  const updateChauffeur = async (id: string, data: UpdateChauffeur) => {
    const { updateChauffeur } = chauffeurService;
    try {
      const chauffeur = await updateChauffeur(id, data);
      return chauffeur;
    } catch (error) {
      console.error("Error updating chauffeur:", error);
      throw error;
    }
  };

  const deleteChauffeur = async (id: string) => {
    const { deleteChauffeur } = chauffeurService;
    try {
      await deleteChauffeur(id);
      return true;
    } catch (error) {
      console.error("Error deleting chauffeur:", error);
      throw error;
    }
  };

  return {
    getChauffeurs,
    createChauffeur,
    updateChauffeur,
    deleteChauffeur,
  };
};
