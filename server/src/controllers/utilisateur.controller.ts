import { Request, Response, NextFunction } from "express";
import * as utilisateurService from "../services/utilisateur.service";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string() });

const createUserSchema = z.object({
  id: z.string(),
  nom: z.string(),
  prenom: z.string(),
  email: z.string().email().optional(),
  motDePasse: z.string(),
  tel: z.string().optional(),
  role: z.string(),
  dateCreation: z.string(),
  dateMiseAJour: z.string(),
});

export const getUtilisateurs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await utilisateurService.getUsersWithMaintenances();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUtilisateur = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const user = await utilisateurService.getUserById(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUtilisateur = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = createUserSchema.parse(req.body);
    const user = await utilisateurService.createUser(data);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUtilisateur = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const data = req.body; // you can add Zod schema for update
    const user = await utilisateurService.updateUser(id, data);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUtilisateur = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    await utilisateurService.deleteUser(id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    next(err);
  }
};
