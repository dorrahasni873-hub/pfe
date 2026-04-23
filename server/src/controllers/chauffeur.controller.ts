import { Request, Response, NextFunction } from "express";
import * as chauffeurService from "../services/chauffeur.service";
import {
  createChauffeurSchema,
  updateChauffeurSchema,
} from "../validators/chauffeur.validator";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string() });

export const getChauffeurs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const chauffeurs = await chauffeurService.getAllChauffeurs();
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
    const chauffeur = await chauffeurService.getChauffeurById(id);
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
  console.log("BODY RECEIVED:", req.body);

  try {
    const data = createChauffeurSchema.parse(req.body);
    const chauffeur = await chauffeurService.createChauffeur(data);
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
    const chauffeur = await chauffeurService.updateChauffeur(id, data);
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
    await chauffeurService.deleteChauffeur(id);
    res.json({ message: "Chauffeur supprimé" });
  } catch (err) {
    next(err);
  }
};
