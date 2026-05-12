import { Router } from "express";
import * as entretienController from "../controleurs/entretien.controller";
import { middlewareAuthentification } from "../middlewares/authentification.middleware";

const router = Router();

router.get("/", middlewareAuthentification, entretienController.getEntretiens);
router.get("/:id", middlewareAuthentification, entretienController.getEntretienById);
router.post("/", middlewareAuthentification, entretienController.createEntretien);
router.put("/:id", middlewareAuthentification, entretienController.updateEntretien);
router.delete("/:id", middlewareAuthentification, entretienController.deleteEntretien);

export default router;
