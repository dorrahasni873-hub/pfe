import { Request, Response, NextFunction } from "express";
import * as panneService from "../services/panne.service";
import {
  createPanneSchema,
  updatePanneSchema,
} from "../validateurs/panne.validator";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string() });

export const getPannes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pannes = await panneService.getAllPannes();
    res.json(pannes);
  } catch (err) {
    next(err);
  }
};

export const getPanneById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const panne = await panneService.getPanneById(id);
    res.json(panne);
  } catch (err) {
    next(err);
  }
};

export const createPanne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = createPanneSchema.parse(req.body);
    const newPanne = await panneService.createPanne(data);
    res.status(201).json(newPanne);
  } catch (err) {
    next(err);
  }
};

export const updatePanne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const data = updatePanneSchema.parse(req.body);
    const updatedPanne = await panneService.updatePanne(id, data);
    res.json(updatedPanne);
  } catch (err) {
    next(err);
  }
};

export const deletePanne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    await panneService.deletePanne(id);
    res.json({ message: "Panne supprimée" });
  } catch (err) {
    next(err);
  }
};
