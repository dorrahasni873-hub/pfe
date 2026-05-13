import { Request, Response, NextFunction } from "express";
import { registerSchema, loginSchema } from "./auth.validation";
import * as authService from "./auth.service";
import { AuthenticatedRequest } from "../../shared/middleware/auth.middleware";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = registerSchema.parse(req.body);
    const user = await authService.registerUser(data);
    res.status(201).json(user[0]);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, motDePasse } = loginSchema.parse(req.body);
    const result = await authService.loginUser(email, motDePasse);
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

export const checkAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const account = await authService.getAuthenticatedUser(
      user.id,
      user.role,
    );
    if (!account) {
      return res.status(401).json({ message: "User not found" });
    }
    return res.json({ user: account });
  } catch (err) {
    next(err);
  }
};
