import express from "express";
import { errorHandler } from "../shared/middleware/error.middleware";
import { authRoutes } from "../modules/auth";
import { userRoutes } from "../modules/users";
import { vehicleRoutes } from "../modules/vehicles";
import { chauffeurRoutes } from "../modules/chauffeurs";
import { affectationRoutes } from "../modules/affectations";
import { maintenanceRoutes } from "../modules/maintenances";
import { panneRoutes } from "../modules/pannes";
import { entretienRoutes } from "../modules/entretiens";
import { carnetRoutes } from "../modules/carnets-de-bord";
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

app.use("/api/vehicules", vehicleRoutes);
app.use("/api/utilisateurs", userRoutes);
app.use("/api/chauffeurs", chauffeurRoutes);
app.use("/api/authentification", authRoutes);
app.use("/api/affectations", affectationRoutes);
app.use("/api/pannes", panneRoutes);
app.use("/api/entretiens", entretienRoutes);
app.use("/api/maintenances", maintenanceRoutes);
app.use("/api/carnetsdebord", carnetRoutes);

app.use(errorHandler);

export default app;
