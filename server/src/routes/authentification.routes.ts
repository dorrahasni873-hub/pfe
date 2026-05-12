import { Router } from "express";
import { register, login, checkAuth } from "../controleurs/authentification.controleur";
import { middlewareAuthentification } from "../middlewares/authentification.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", middlewareAuthentification, checkAuth);

export default router;
