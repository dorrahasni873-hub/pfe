import express from "express";
import { gestionnaireErreurs } from "./middlewares/erreur.middleware";
import vehiculeRoutes from "./routes/vehicule.routes";
import utilisateurRoutes from "./routes/utilisateur.routes";
import affectationRoutes from "./routes/affectation.routes";
import chauffeurRoutes from "./routes/chauffeur.routes";
import maintenanceRoutes from "./routes/maintenance.routes";
import carnetDeBordRoutes from "./routes/carnet-de-bord.routes";
import panneRoutes from "./routes/panne.routes";
import entretienRoutes from "./routes/entretien.routes";
import authentificationRoutes from "./routes/authentification.routes";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());

dotenv.config();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/vehicules", vehiculeRoutes);
app.use("/api/utilisateurs", utilisateurRoutes);
app.use("/api/chauffeurs", chauffeurRoutes);
app.use("/api/authentification", authentificationRoutes);
app.use("/api/affectations", affectationRoutes);
app.use("/api/pannes", panneRoutes);
app.use("/api/entretiens", entretienRoutes);
app.use("/api/maintenances", maintenanceRoutes);
app.use("/api/carnetsdebord", carnetDeBordRoutes);

app.use(gestionnaireErreurs);

export default app;
