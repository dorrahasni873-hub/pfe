import { Request, Response, NextFunction } from "express";
import * as affectationService from "../services/affectation.service";

import { z } from "zod";
import {
  createAffectationSchema,
  updateAffectationSchema,
} from "../validateurs/affectation.validator";

const paramsSchema = z.object({
  id: z.string(),
});

export const getAffectations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const affectations = await affectationService.getAllAffectations();
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

    const affectation = await affectationService.getAffectationById(id);

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

    const result = await affectationService.createAffectation(data);

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

    const result = await affectationService.updateAffectation(id, data);

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

    await affectationService.deleteAffectation(id);

    res.json({ message: "Affectation supprimée" });
  } catch (err) {
    next(err);
  }
};
