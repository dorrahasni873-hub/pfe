import { Request, Response, NextFunction } from "express";
import * as vehiclesService from "./vehicles.service";
import { z } from "zod";

const paramsSchema = z.object({ matricule: z.string() });

const createVehicleSchema = z.object({
  matricule: z.string(),
  marque: z.string(),
  dateCirculation: z.string(),
  dateVisite: z.string(),
  dateTaxe: z.string(),
  etat: z.string(),
});

export const getVehicles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const vehicles = await vehiclesService.getAll();
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

export const getVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { matricule } = paramsSchema.parse(req.params);
    const vehicle = await vehiclesService.getByMatricule(matricule);
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

export const createVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = createVehicleSchema.parse(req.body);
    const vehicle = await vehiclesService.create(data);
    return res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
};

export const updateVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { matricule } = paramsSchema.parse(req.params);
    const data = req.body;
    const vehicle = await vehiclesService.update(matricule, data);
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

export const deleteVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { matricule } = paramsSchema.parse(req.params);
    await vehiclesService.remove(matricule);
    res.json({ message: "Vehicule supprimé" });
  } catch (err) {
    next(err);
  }
};
