import { Router } from "express";
import * as pannesController from "./pannes.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, pannesController.getPannes);
router.get("/:id", authMiddleware, pannesController.getPanne);
router.post("/", authMiddleware, pannesController.createPanne);
router.put("/:id", authMiddleware, pannesController.updatePanne);
router.delete("/:id", authMiddleware, pannesController.deletePanne);

export default router;
