import { vehiculeApi } from "@/api/vehiculeApi";

export type VehiculePayload = {
  matricule: string;
  marqueVoiture: string;
  dateCirculation: string;
  dateVisite: string;
  dateTaxe: string;
  etat: string;
};

export const useVehicule = () => {
  const getVehicules = async () => {
    const { getVehicules } = vehiculeApi();
    try {
      const vehicules = await getVehicules();
      return vehicules;
    } catch (error) {
      console.error("Error fetching vehicules:", error);
      throw error;
    }
  };

  const createVehicule = async (data: VehiculePayload) => {
    const { createVehicule } = vehiculeApi();
    try {
      const vehicule = await createVehicule(data);
      return vehicule;
    } catch (error) {
      console.error("Error creating vehicule:", error);
      throw error;
    }
  };

  const updateVehicule = async (id: string, data: VehiculePayload) => {
    const { updateVehicule } = vehiculeApi();
    try {
      const vehicule = await updateVehicule(id, data);
      return vehicule;
    } catch (error) {
      console.error("Error updating vehicule:", error);
      throw error;
    }
  };

  const deleteVehicule = async (matricule: string) => {
    const { deleteVehicule } = vehiculeApi();
    try {
      await deleteVehicule(matricule);
      return true;
    } catch (error) {
      console.error("Error deleting vehicule:", error);
      throw error;
    }
  };

  return { getVehicules, createVehicule, updateVehicule, deleteVehicule };
};
