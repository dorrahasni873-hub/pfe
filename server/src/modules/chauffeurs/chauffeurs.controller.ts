import { Request, Response, NextFunction } from "express";
import * as chauffeursService from "./chauffeurs.service";
import {
  createChauffeurSchema,
  updateChauffeurSchema,
} from "./chauffeurs.validation";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string() });

export const getChauffeurs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const chauffeurs = await chauffeursService.getAll();
    res.json(chauffeurs);
  } catch (err) {
    next(err);
  }
};

export const getChauffeur = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const chauffeur = await chauffeursService.getById(id);
    res.json(chauffeur);
  } catch (err) {
    next(err);
  }
};

export const createChauffeur = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = createChauffeurSchema.parse(req.body);
    const chauffeur = await chauffeursService.create(data);
    res.status(201).json(chauffeur);
  } catch (err) {
    next(err);
  }
};

export const updateChauffeur = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const data = updateChauffeurSchema.parse(req.body);
    const chauffeur = await chauffeursService.update(id, data);
    res.json(chauffeur);
  } catch (err) {
    next(err);
  }
};

export const deleteChauffeur = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    await chauffeursService.remove(id);
    res.json({ message: "Chauffeur supprimé" });
  } catch (err) {
    next(err);
  }
};
