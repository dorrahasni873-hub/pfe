import api from "@/shared/lib/axios";

export const aiService = {
  ask: async (query: string) => {
    const response = await api.post("/ai/ask", { query });
    return response.data;
  },
};
