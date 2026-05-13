import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET!;

export interface JwtPayload {
  id: string;
  role: string;
}

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: 24 * 60 * 60,
  } as SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
