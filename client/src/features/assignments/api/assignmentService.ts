import type { AffectationPayload } from "@/features/assignments/types";
import api from "@/shared/lib/axios";

export const assignmentService = {
  getAll: async () => {
    const response = await api.get("/affectations");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/affectations/${id}`);
    return response.data;
  },

  create: async (data: AffectationPayload) => {
    const response = await api.post("/affectations", data);
    return response.data;
  },

  update: async (id: string, data: Partial<AffectationPayload>) => {
    const response = await api.put(`/affectations/${id}`, data);
    return response.data;
  },

  remove: async (id: string) => {
    const response = await api.delete(`/affectations/${id}`);
    return response.data;
  },
};
