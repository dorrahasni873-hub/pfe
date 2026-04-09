import { Router } from "express";
import * as utilisateurController from "../controllers/utilisateur.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, utilisateurController.getUtilisateurs);
router.get("/:id", authMiddleware, utilisateurController.getUtilisateur);
router.post("/", authMiddleware, utilisateurController.createUtilisateur);
router.put("/:id", authMiddleware, utilisateurController.updateUtilisateur);
router.delete("/:id", authMiddleware, utilisateurController.deleteUtilisateur);

export default router;
