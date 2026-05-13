import { Request, Response, NextFunction } from "express";
import * as affectationsService from "./affectations.service";
import {
  createAffectationSchema,
  updateAffectationSchema,
} from "./affectations.validation";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string() });

export const getAffectations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const affectations = await affectationsService.getAll();
    res.json(affectations);
  } catch (err) {
    next(err);
  }
};

export const getAffectation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const affectation = await affectationsService.getById(id);
    res.json(affectation);
  } catch (err) {
    next(err);
  }
};

export const createAffectation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = createAffectationSchema.parse(req.body);
    const result = await affectationsService.create(data);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateAffectation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const data = updateAffectationSchema.parse(req.body);
    const result = await affectationsService.update(id, data);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteAffectation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    await affectationsService.remove(id);
    res.json({ message: "Affectation supprimée" });
  } catch (err) {
    next(err);
  }
};
