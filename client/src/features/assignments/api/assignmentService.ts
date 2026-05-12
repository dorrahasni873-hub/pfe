import type { AffectationPayload } from "@/shared/types/types";
import api from "@/shared/lib/axios";

export const affectationService = () => {
  const createAffectation = async (data: AffectationPayload) => {
    try {
      const res = await api.post("/affectations", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getAffectations = async () => {
    try {
      const res = await api.get("/affectations");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAffectation = async (id: string) => {
    try {
      const res = await api.delete(`/affectations/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateAffectation = async (id: string, data: AffectationPayload) => {
    try {
      const res = await api.put(`/affectations/${id}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createAffectation,
    getAffectations,
    deleteAffectation,
    updateAffectation,
  };
};
