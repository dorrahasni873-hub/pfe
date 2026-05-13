import { Router } from "express";
import * as maintenancesController from "./maintenances.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, maintenancesController.getMaintenances);
router.get("/:id", authMiddleware, maintenancesController.getMaintenance);
router.post("/", authMiddleware, maintenancesController.createMaintenance);
router.put("/:id", authMiddleware, maintenancesController.updateMaintenance);
router.delete("/:id", authMiddleware, maintenancesController.deleteMaintenance);

export default router;
