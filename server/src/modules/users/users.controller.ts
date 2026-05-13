import { Request, Response, NextFunction } from "express";
import * as usersService from "./users.service";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string() });

const createUserSchema = z.object({
  nom: z.string(),
  prenom: z.string(),
  email: z.string().email().optional(),
  motDePasse: z.string(),
  tel: z.string().optional(),
  role: z.string(),
});

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await usersService.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const user = await usersService.getById(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = createUserSchema.parse(req.body);
    const user = await usersService.create(data);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const data = req.body;
    const user = await usersService.update(id, data);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    await usersService.remove(id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    next(err);
  }
};
