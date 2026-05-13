import { Router } from "express";
import * as vehiclesController from "./vehicles.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, vehiclesController.getVehicles);
router.get("/:matricule", authMiddleware, vehiclesController.getVehicle);
router.post("/", authMiddleware, vehiclesController.createVehicle);
router.put("/:matricule", authMiddleware, vehiclesController.updateVehicle);
router.delete("/:matricule", authMiddleware, vehiclesController.deleteVehicle);

export default router;
