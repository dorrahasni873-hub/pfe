import { Router } from "express";
import * as panneController from "../controllers/panne.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, panneController.getPannes);
router.get("/:id", authMiddleware, panneController.getPanneById);
router.post("/", authMiddleware, panneController.createPanne);
router.put("/:id", authMiddleware, panneController.updatePanne);
router.delete("/:id", authMiddleware, panneController.deletePanne);

export default router;
