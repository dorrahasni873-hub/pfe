import { Request, Response, NextFunction } from "express";
import { registerSchema, loginSchema, changePasswordSchema } from "./auth.validation";
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

export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Non authentifié" });
    }
    const { oldPassword, newPassword } = changePasswordSchema.parse(req.body);
    const success = await authService.changePassword(
      user.id,
      user.role,
      oldPassword,
      newPassword,
    );
    if (!success) {
      return res.status(400).json({ message: "Ancien mot de passe incorrect" });
    }
    return res.json({ message: "Mot de passe mis à jour" });
  } catch (err) {
    next(err);
  }
};

export const deleteAccount = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Non authentifié" });
    }
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Mot de passe requis" });
    }
    const success = await authService.deleteAccount(user.id, user.role, password);
    if (!success) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }
    return res.json({ message: "Compte supprimé" });
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
