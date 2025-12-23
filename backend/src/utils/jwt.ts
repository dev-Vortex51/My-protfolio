import jwt, { type SignOptions } from "jsonwebtoken";
import { config } from "../config/env.js";

export function signAccessToken(userId: string, role: "admin" | "user") {
  return jwt.sign({ sub: userId, role }, config.JWT_ACCESS_SECRET, {
    expiresIn: config.JWT_ACCESS_EXPIRES,
  } as SignOptions);
}

export function signRefreshToken(userId: string, role: "admin" | "user") {
  return jwt.sign({ sub: userId, role }, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRES,
  } as SignOptions);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, config.JWT_REFRESH_SECRET) as {
    sub: string;
    role: "admin" | "user";
  };
}
