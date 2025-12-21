import { randomUUID } from "node:crypto";
import type { Request, Response, NextFunction } from "express";

export function requestId(req: Request, res: Response, next: NextFunction) {
  const id = req.headers["x-request-id"] || randomUUID();
  res.setHeader("X-Request-Id", String(id));
  (req as any).requestId = id;
  next();
}
