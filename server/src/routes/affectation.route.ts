import { Router } from "express";
import * as affectationController from "../controllers/affectation.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, affectationController.getAffectations);
router.get("/:id", authMiddleware, affectationController.getAffectation);
router.post("/", authMiddleware, affectationController.createAffectation);
router.put("/:id", authMiddleware, affectationController.updateAffectation);
router.delete("/:id", authMiddleware, affectationController.deleteAffectation);

export default router;
