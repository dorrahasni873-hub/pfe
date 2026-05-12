import { Router } from "express";
import * as affectationController from "../controleurs/affectation.controller";
import { middlewareAuthentification } from "../middlewares/authentification.middleware";

const router = Router();

router.get("/", middlewareAuthentification, affectationController.getAffectations);
router.get("/:id", middlewareAuthentification, affectationController.getAffectation);
router.post("/", middlewareAuthentification, affectationController.createAffectation);
router.put("/:id", middlewareAuthentification, affectationController.updateAffectation);
router.delete("/:id", middlewareAuthentification, affectationController.deleteAffectation);

export default router;
