import { Router } from "express";
import * as chauffeurController from "../controleurs/chauffeur.controller";
import { middlewareAuthentification } from "../middlewares/authentification.middleware";

const router = Router();

router.get("/", middlewareAuthentification, chauffeurController.getChauffeurs);
router.get("/:id", middlewareAuthentification, chauffeurController.getChauffeur);
router.post("/", middlewareAuthentification, chauffeurController.createChauffeur);
router.put("/:id", middlewareAuthentification, chauffeurController.updateChauffeur);
router.delete("/:id", middlewareAuthentification, chauffeurController.deleteChauffeur);

export default router;
