import { Router } from "express";
import * as panneController from "../controleurs/panne.controller";
import { middlewareAuthentification } from "../middlewares/authentification.middleware";

const router = Router();

router.get("/", middlewareAuthentification, panneController.getPannes);
router.get("/:id", middlewareAuthentification, panneController.getPanneById);
router.post("/", middlewareAuthentification, panneController.createPanne);
router.put("/:id", middlewareAuthentification, panneController.updatePanne);
router.delete("/:id", middlewareAuthentification, panneController.deletePanne);

export default router;
