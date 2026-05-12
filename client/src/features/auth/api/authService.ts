import api from "@/shared/lib/axios";

export const authentificationService = () => {
  const loginApi = async (email: string, motDePasse: string) => {
    try {
      const res = await api.post("/authentification/login", {
        email,
        motDePasse,
      });

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const registerApi = async (
    email: string,
    motDePasse: string,
    nom: string,
    prenom: string,
    tel: string,
  ) => {
    try {
      const res = await api.post("/authentification/register", {
        email,
        motDePasse,
        nom,
        prenom,
        tel,
      });
      return res.data;
    } catch (error) {
      console.error("Register API error:", error);
      throw error;
    }
  };

  const checkMe = async () => {
    try {
      const res = await api.get("/authentification/me");
      return res.data;
    } catch (error) {
      console.error("CheckMe API error:", error);
      throw error;
    }
  };
  return { loginApi, registerApi, checkMe };
};
