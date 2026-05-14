import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import * as aiService from "./ai.service";

const querySchema = z.object({
  query: z.string().min(1, "La question est requise"),
});

export const ask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = querySchema.parse(req.body);
    const result = await aiService.executeQuery(query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
