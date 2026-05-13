import { Request, Response, NextFunction } from "express";
import * as pannesService from "./pannes.service";
import { createPanneSchema, updatePanneSchema } from "./pannes.validation";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string() });

export const getPannes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pannes = await pannesService.getAll();
    res.json(pannes);
  } catch (err) {
    next(err);
  }
};

export const getPanne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const panne = await pannesService.getById(id);
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
    const newPanne = await pannesService.create(data);
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
    const updated = await pannesService.update(id, data);
    res.json(updated);
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
    await pannesService.remove(id);
    res.json({ message: "Panne supprimée" });
  } catch (err) {
    next(err);
  }
};
