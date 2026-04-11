import { Request, Response, NextFunction } from "express";
import * as vehiculeService from "../services/vehicule.service";
import { z } from "zod";

const paramsSchema = z.object({ matricule: z.string() });

const createVehiculeSchema = z.object({
  matricule: z.string(),
  marqueVoiture: z.string(),
  dateCirculation: z.string(),
  dateVisite: z.string(),
  dateTaxe: z.string(),
  etat: z.string(),
});

export const getVehicules = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const vehicles = await vehiculeService.getVehicules();
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

export const getVehicule = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { matricule } = paramsSchema.parse(req.params);
    const vehicle = await vehiculeService.getVehiculeByMatricule(matricule);
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

export const createVehicule = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("BODY RECEIVED:", req.body);

  try {
    const data = createVehiculeSchema.parse(req.body);

    const vehicle = await vehiculeService.createVehicule(data);

    return res.status(201).json(vehicle);
  } catch (err) {
    console.error("CREATE VEHICULE ERROR:", err);
    next(err);
  }
};

export const updateVehicule = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { matricule } = paramsSchema.parse(req.params);
    const data = req.body; // add Zod validation if needed
    const vehicle = await vehiculeService.updateVehicule(matricule, data);
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

export const deleteVehicule = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { matricule } = paramsSchema.parse(req.params);
    await vehiculeService.deleteVehicule(matricule);
    res.json({ message: "Vehicule supprimé" });
  } catch (err) {
    next(err);
  }
};
