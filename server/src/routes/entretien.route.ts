import { Router } from "express";
import * as entretienController from "../controllers/entretien.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, entretienController.getEntretiens);
router.get("/:id", authMiddleware, entretienController.getEntretienById);
router.post("/", authMiddleware, entretienController.createEntretien);
router.put("/:id", authMiddleware, entretienController.updateEntretien);
router.delete("/:id", authMiddleware, entretienController.deleteEntretien);

export default router;
