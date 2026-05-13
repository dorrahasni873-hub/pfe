import { Router } from "express";
import * as carnetsController from "./carnets-de-bord.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, carnetsController.getCarnets);
router.get("/:id", authMiddleware, carnetsController.getCarnet);
router.post("/", authMiddleware, carnetsController.createCarnet);
router.put("/:id", authMiddleware, carnetsController.updateCarnet);
router.delete("/:id", authMiddleware, carnetsController.deleteCarnet);

export default router;
