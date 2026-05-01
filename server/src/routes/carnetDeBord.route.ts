import { Router } from "express";
import * as carnetController from "../controllers/carnetDeBord.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, carnetController.getCarnetsDeBord);
router.get("/:id", authMiddleware, carnetController.getCarnetDeBordById);
router.post("/", authMiddleware, carnetController.createCarnetDeBord);
router.put("/:id", authMiddleware, carnetController.updateCarnetDeBord);
router.delete("/:id", authMiddleware, carnetController.deleteCarnetDeBord);

export default router;
