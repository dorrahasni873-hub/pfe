import { Router } from "express";
import * as usersController from "./users.controller";
import { authMiddleware } from "../../shared/middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, usersController.getUsers);
router.get("/:id", authMiddleware, usersController.getUser);
router.post("/", authMiddleware, usersController.createUser);
router.put("/:id", authMiddleware, usersController.updateUser);
router.delete("/:id", authMiddleware, usersController.deleteUser);

export default router;
