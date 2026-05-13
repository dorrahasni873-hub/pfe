import { Request, Response, NextFunction } from "express";
import * as entretiensService from "./entretiens.service";
import {
  createEntretienSchema,
  updateEntretienSchema,
} from "./entretiens.validation";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string() });

export const getEntretiens = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const entretiens = await entretiensService.getAll();
    res.json(entretiens);
  } catch (err) {
    next(err);
  }
};

export const getEntretien = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const entretien = await entretiensService.getById(id);
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
    const newEntretien = await entretiensService.create(data);
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
    const updated = await entretiensService.update(id, data);
    res.json(updated);
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
    await entretiensService.remove(id);
    res.json({ message: "Entretien supprimé" });
  } catch (err) {
    next(err);
  }
};
