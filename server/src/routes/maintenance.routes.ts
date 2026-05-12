import { Router } from "express";
import * as maintenanceController from "../controleurs/maintenance.controller";
import { middlewareAuthentification } from "../middlewares/authentification.middleware";

const router = Router();

router.get("/", middlewareAuthentification, maintenanceController.getMaintenances);
router.get("/:id", middlewareAuthentification, maintenanceController.getMaintenanceById);
router.post("/", middlewareAuthentification, maintenanceController.createMaintenance);
router.put("/:id", middlewareAuthentification, maintenanceController.updateMaintenance);
router.delete("/:id", middlewareAuthentification, maintenanceController.deleteMaintenance);

export default router;
