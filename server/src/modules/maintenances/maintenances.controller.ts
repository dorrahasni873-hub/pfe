import { Request, Response, NextFunction } from "express";
import * as maintenancesService from "./maintenances.service";
import {
  createMaintenanceSchema,
  updateMaintenanceSchema,
} from "./maintenances.validation";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string() });

export const getMaintenances = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const maintenances = await maintenancesService.getAll();
    res.json(maintenances);
  } catch (err) {
    next(err);
  }
};

export const getMaintenance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const maintenance = await maintenancesService.getById(id);
    res.json(maintenance);
  } catch (err) {
    next(err);
  }
};

export const createMaintenance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = createMaintenanceSchema.parse(req.body);
    const newMaintenance = await maintenancesService.create(data);
    res.status(201).json(newMaintenance);
  } catch (err) {
    next(err);
  }
};

export const updateMaintenance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const data = updateMaintenanceSchema.parse(req.body);
    const updated = await maintenancesService.update(id, data);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteMaintenance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    await maintenancesService.remove(id);
    res.json({ message: "Maintenance supprimée" });
  } catch (err) {
    next(err);
  }
};
