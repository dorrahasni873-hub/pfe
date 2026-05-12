import { Router } from "express";
import * as utilisateurController from "../controleurs/utilisateur.controller";
import { middlewareAuthentification } from "../middlewares/authentification.middleware";

const router = Router();

router.get("/", middlewareAuthentification, utilisateurController.getUtilisateurs);
router.get("/:id", middlewareAuthentification, utilisateurController.getUtilisateur);
router.post("/", middlewareAuthentification, utilisateurController.createUtilisateur);
router.put("/:id", middlewareAuthentification, utilisateurController.updateUtilisateur);
router.delete("/:id", middlewareAuthentification, utilisateurController.deleteUtilisateur);

export default router;
