import type { VehiculePayload } from "@/shared/types/types";
import api from "@/shared/lib/axios";

export const vehiculeService = () => {
  const getVehicules = async () => {
    const response = await api.get("/vehicules");
    return response.data;
  };

  const createVehicule = async (data: VehiculePayload) => {
    console.log("data", data);

    const response = await api.post("/vehicules", data);
    return response.data;
  };

  const updateVehicule = async (id: string, data: VehiculePayload) => {
    const response = await api.put(`/vehicules/${id}`, data);
    return response.data;
  };

  const deleteVehicule = async (matricule: string) => {
    const response = await api.delete(`/vehicules/${matricule}`);
    return response.data;
  };

  return {
    getVehicules,
    createVehicule,
    updateVehicule,
    deleteVehicule,
  };
};
