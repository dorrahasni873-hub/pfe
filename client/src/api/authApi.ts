import api from "./axios";

export const authApi = () => {
  const loginApi = async (email: string, motDePasse: string) => {
    try {
      const res = await api.post("/auth/login", {
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
      const res = await api.post("/auth/register", {
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
      const res = await api.get("/auth/me");
      return res.data;
    } catch (error) {
      console.error("CheckMe API error:", error);
      throw error;
    }
  };
  return { loginApi, registerApi, checkMe };
};
