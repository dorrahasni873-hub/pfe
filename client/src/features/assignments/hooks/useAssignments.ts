import type { Affectation, AffectationPayload } from "@/shared/types/types";
import { affectationService } from "@/features/assignments/api/assignmentService";

export const useAffectation = () => {
  const createAffectation = async (data: AffectationPayload) => {
    try {
      const { createAffectation } = affectationService();
      const res = await createAffectation(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getAffectations = async (): Promise<Affectation[] | undefined> => {
    try {
      const { getAffectations } = affectationService();
      const res = await getAffectations();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAffectation = async (id: string) => {
    try {
      const { deleteAffectation } = affectationService();
      const res = await deleteAffectation(id);
      return res?.message ?? "Affectation deleted";
    } catch (error) {
      console.log(error);
    }
  };

  const updateAffectation = async (id: string, data: AffectationPayload) => {
    try {
      const { updateAffectation } = affectationService();
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
