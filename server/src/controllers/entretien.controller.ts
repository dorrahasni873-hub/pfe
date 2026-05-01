import { Request, Response, NextFunction } from "express";
import * as panneService from "../services/entretien.service";
import {
  createEntretienSchema,
  updateEntretienSchema,
} from "../validators/entretien.validator";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string() });

export const getEntretiens = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const entretiens = await panneService.getAllEntretiens();
    res.json(entretiens);
  } catch (err) {
    next(err);
  }
};

export const getEntretienById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const entretien = await panneService.getEntretienById(id);
    res.json(entretien);
  } catch (err) {
    next(err);
  }
};

export const createEntretien = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = createEntretienSchema.parse(req.body);
    const newEntretien = await panneService.createEntretien(data);
    res.status(201).json(newEntretien);
  } catch (err) {
    next(err);
  }
};

export const updateEntretien = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const data = updateEntretienSchema.parse(req.body);
    const updatedEntretien = await panneService.updateEntretien(id, data);
    res.json(updatedEntretien);
  } catch (err) {
    next(err);
  }
};

export const deleteEntretien = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    await panneService.deleteEntretien(id);
    res.json({ message: "Entretien supprimé" });
  } catch (err) {
    next(err);
  }
};
