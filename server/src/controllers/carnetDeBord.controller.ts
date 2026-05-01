import { Request, Response, NextFunction } from "express";
import * as carnetService from "../services/carnetDeBord.service";
import {
  createCarnetDeBordSchema,
  updateCarnetDeBordSchema,
} from "../validators/carnetDeBord";
import { z } from "zod";
import { createPanneSchema } from "../validators/panne.validator";

const paramsSchema = z.object({ id: z.string() });

export const getCarnetsDeBord = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const carnets = await carnetService.getAllCarnetsDeBord();
    res.json(carnets);
  } catch (err) {
    next(err);
  }
};

export const getCarnetDeBordById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const carnets = await carnetService.getCarnetDeBordById(id);
    res.json(carnets);
  } catch (err) {
    next(err);
  }
};

export const createCarnetDeBord = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = createCarnetDeBordSchema.parse(req.body);
    const newCarnet = await carnetService.createCarnetDeBord(data);
    res.status(201).json(newCarnet);
  } catch (err) {
    next(err);
  }
};

export const updateCarnetDeBord = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const data = updateCarnetDeBordSchema.parse(req.body);
    const updatedCarnet = await carnetService.updateCarnetDeBord(id, data);
    res.json(updatedCarnet);
  } catch (err) {
    next(err);
  }
};

export const deleteCarnetDeBord = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    await carnetService.deleteCarnetDeBord(id);
    res.json({ message: "Carnet de bord supprimé" });
  } catch (err) {
    next(err);
  }
};
