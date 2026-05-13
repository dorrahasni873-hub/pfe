import { env } from "./env";
import type { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: env.CLIENT_URL,
  credentials: true,
};
