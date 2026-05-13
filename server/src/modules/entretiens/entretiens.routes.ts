import { Router } from "express";
import * as entretiensController from "./entretiens.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, entretiensController.getEntretiens);
router.get("/:id", authMiddleware, entretiensController.getEntretien);
router.post("/", authMiddleware, entretiensController.createEntretien);
router.put("/:id", authMiddleware, entretiensController.updateEntretien);
router.delete("/:id", authMiddleware, entretiensController.deleteEntretien);

export default router;
