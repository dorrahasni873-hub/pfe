import { Request, Response, NextFunction } from "express";
import * as vehiculeService from "../services/vehicule.service";
import { z } from "zod";

const paramsSchema = z.object({ matricule: z.string() });

// Body schema
const createVehiculeSchema = z.object({
  matricule: z.number(),
  marqueVoiture: z.string(),
  dateCirculation: z.string(),
  dateVisite: z.string(),
  dateTaxe: z.string(),
  etat: z.string(),
  dateCreation: z.string(),
  dateMiseAJour: z.string(),
});

export const getVehicules = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const vehicles = await vehiculeService.getVehiculesWithMaintenances();
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
    const vehicle = await vehiculeService.getVehiculeByMatricule(
      Number(matricule),
    );
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
  try {
    const data = createVehiculeSchema.parse(req.body);
    const vehicle = await vehiculeService.createVehicule(data);
    res.status(201).json(vehicle);
  } catch (err) {
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
    const vehicle = await vehiculeService.updateVehicule(
      Number(matricule),
      data,
    );
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
    await vehiculeService.deleteVehicule(Number(matricule));
    res.json({ message: "Vehicule supprimé" });
  } catch (err) {
    next(err);
  }
};
