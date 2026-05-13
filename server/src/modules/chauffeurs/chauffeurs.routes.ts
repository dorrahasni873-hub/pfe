import { Router } from "express";
import * as chauffeursController from "./chauffeurs.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, chauffeursController.getChauffeurs);
router.get("/:id", authMiddleware, chauffeursController.getChauffeur);
router.post("/", authMiddleware, chauffeursController.createChauffeur);
router.put("/:id", authMiddleware, chauffeursController.updateChauffeur);
router.delete("/:id", authMiddleware, chauffeursController.deleteChauffeur);

export default router;
