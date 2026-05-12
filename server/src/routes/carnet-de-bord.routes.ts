import { Router } from "express";
import * as carnetController from "../controleurs/carnet-de-bord.controleur";
import { middlewareAuthentification } from "../middlewares/authentification.middleware";

const router = Router();

router.get("/", middlewareAuthentification, carnetController.getCarnetsDeBord);
router.get("/:id", middlewareAuthentification, carnetController.getCarnetDeBordById);
router.post("/", middlewareAuthentification, carnetController.createCarnetDeBord);
router.put("/:id", middlewareAuthentification, carnetController.updateCarnetDeBord);
router.delete("/:id", middlewareAuthentification, carnetController.deleteCarnetDeBord);

export default router;
