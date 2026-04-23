import { Router } from "express";
import * as maintenanceController from "../controllers/maintenance.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, maintenanceController.getMaintenances);
router.get("/:id", authMiddleware, maintenanceController.getMaintenanceById);
router.post("/", authMiddleware, maintenanceController.createMaintenance);
router.put("/:id", authMiddleware, maintenanceController.updateMaintenance);
router.delete("/:id", authMiddleware, maintenanceController.deleteMaintenance);

export default router;
