import { Router } from "express";
import * as vehiculeController from "../controllers/vehicule.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, vehiculeController.getVehicules);
router.get("/:matricule", authMiddleware, vehiculeController.getVehicule);
router.post("/", authMiddleware, vehiculeController.createVehicule);
router.put("/:matricule", authMiddleware, vehiculeController.updateVehicule);
router.delete("/:matricule", authMiddleware, vehiculeController.deleteVehicule);

export default router;
