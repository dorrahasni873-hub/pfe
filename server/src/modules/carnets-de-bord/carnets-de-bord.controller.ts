import { Request, Response, NextFunction } from "express";
import * as carnetsService from "./carnets-de-bord.service";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string() });

export const getCarnets = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const carnets = await carnetsService.getAll();
    res.json(carnets);
  } catch (err) {
    next(err);
  }
};

export const getCarnet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const carnet = await carnetsService.getById(id);
    res.json(carnet);
  } catch (err) {
    next(err);
  }
};

export const createCarnet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const newCarnet = await carnetsService.create(data);
    res.status(201).json(newCarnet);
  } catch (err) {
    next(err);
  }
};

export const updateCarnet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const data = req.body;
    const updated = await carnetsService.update(id, data);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteCarnet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    await carnetsService.remove(id);
    res.json({ message: "Carnet de bord supprimé" });
  } catch (err) {
    next(err);
  }
};
