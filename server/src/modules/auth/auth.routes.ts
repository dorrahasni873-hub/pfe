import { Router } from "express";
import { register, login, checkAuth } from "./auth.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, checkAuth);

export default router;
