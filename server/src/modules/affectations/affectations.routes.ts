import { Router } from "express";
import * as affectationsController from "./affectations.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, affectationsController.getAffectations);
router.get("/:id", authMiddleware, affectationsController.getAffectation);
router.post("/", authMiddleware, affectationsController.createAffectation);
router.put("/:id", authMiddleware, affectationsController.updateAffectation);
router.delete("/:id", authMiddleware, affectationsController.deleteAffectation);

export default router;
