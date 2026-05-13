import api from "@/shared/lib/axios";

export const authService = {
  login: async (email: string, motDePasse: string) => {
    const response = await api.post("/authentification/login", { email, motDePasse });
    return response.data;
  },

  register: async (email: string, motDePasse: string, nom: string, prenom: string, tel: string) => {
    const response = await api.post("/authentification/register", { email, motDePasse, nom, prenom, tel });
    return response.data;
  },

  checkMe: async () => {
    const response = await api.get("/authentification/me");
    return response.data;
  },
};
