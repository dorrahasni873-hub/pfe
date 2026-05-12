import { Router } from "express";
import * as vehiculeController from "../controleurs/vehicule.controller";
import { middlewareAuthentification } from "../middlewares/authentification.middleware";

const router = Router();

router.get("/", middlewareAuthentification, vehiculeController.getVehicules);
router.get("/:matricule", middlewareAuthentification, vehiculeController.getVehicule);
router.post("/", middlewareAuthentification, vehiculeController.createVehicule);
router.put("/:matricule", middlewareAuthentification, vehiculeController.updateVehicule);
router.delete("/:matricule", middlewareAuthentification, vehiculeController.deleteVehicule);

export default router;
