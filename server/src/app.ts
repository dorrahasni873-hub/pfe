import express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import vehiculeRoutes from "./routes/vehicule.routes";
import utilisateurRoutes from "./routes/utilisateur.routes";
import AffectationRoutes from "./routes/affectation.route";
import chauffeurRoutes from "./routes/chauffeur.routes";
import MaintenanceRoutes from "./routes/maintenance.route";
import authRoutes from "./routes/auth.routes";
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
app.use("/api/auth", authRoutes);
app.use("/api/affectations", AffectationRoutes);
app.use("/api/maintenances", MaintenanceRoutes);

app.use(errorHandler);
export default app;
