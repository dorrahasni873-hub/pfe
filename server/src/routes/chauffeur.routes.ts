import { Router } from "express";
import * as chauffeurController from "../controllers/chauffeur.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, chauffeurController.getChauffeurs);
router.get("/:id", authMiddleware, chauffeurController.getChauffeur);
router.post("/", authMiddleware, chauffeurController.createChauffeur);
router.put("/:id", authMiddleware, chauffeurController.updateChauffeur);
router.delete("/:id", authMiddleware, chauffeurController.deleteChauffeur);

export default router;
