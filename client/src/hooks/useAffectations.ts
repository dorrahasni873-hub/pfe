import type { Affectation, AffectationPayload } from "@/@types/types";
import { affectationApi } from "@/api/affectationApi";

export const useAffectation = () => {
  const createAffectation = async (data: AffectationPayload) => {
    try {
      const { createAffectation } = affectationApi();
      const res = await createAffectation(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getAffectations = async (): Promise<Affectation[] | undefined> => {
    try {
      const { getAffectations } = affectationApi();
      const res = await getAffectations();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAffectation = async (id: string) => {
    try {
      const { deleteAffectation } = affectationApi();
      const res = await deleteAffectation(id);
      return res?.message ?? "Affectation deleted";
    } catch (error) {
      console.log(error);
    }
  };

  const updateAffectation = async (id: string, data: AffectationPayload) => {
    try {
      const { updateAffectation } = affectationApi();
      const res = await updateAffectation(id, data);
      return res;
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
