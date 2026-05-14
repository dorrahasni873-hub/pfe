import { Router } from "express";
import { register, login, checkAuth, changePassword, deleteAccount } from "./auth.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, checkAuth);
router.put("/change-password", authMiddleware, changePassword);
router.delete("/account", authMiddleware, deleteAccount);

export default router;
