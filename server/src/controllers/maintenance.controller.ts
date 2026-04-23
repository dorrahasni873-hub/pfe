import { Request, Response, NextFunction } from "express";
import * as maintenanceService from "../services/maintenance.service";
import {
  createMaintenanceSchema,
  updateMaintenanceSchema,
} from "../validators/maintenance.validator";
import { z } from "zod";

const paramsSchema = z.object({ id: z.string() });

export const getMaintenances = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const maintenances = await maintenanceService.getAllMaintenances();
    res.json(maintenances);
  } catch (err) {
    next(err);
  }
};

export const getMaintenanceById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = paramsSchema.parse(req.params);
    const maintenance = await maintenanceService.getMaintenanceById(id);
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
    const newMaintenance = await maintenanceService.createMaintenance(data);
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
    const updatedMaintenance = await maintenanceService.updateMaintenance(
      id,
      data,
    );
    res.json(updatedMaintenance);
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
    await maintenanceService.deleteMaintenance(id);
    res.json({ message: "Maintenance supprimée" });
  } catch (err) {
    next(err);
  }
};
