import jwt, { SignOptions } from "jsonwebtoken";
import { authConfig } from "../../config";

const JWT_SECRET: jwt.Secret = authConfig.jwtSecret;

export interface JwtPayload {
  id: string;
  role: string;
}

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: authConfig.jwtExpiresIn,
  } as SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
