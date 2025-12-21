import type { Express } from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import { config } from "../config/env.js";

export function applySecurityMiddleware(app: Express) {
  app.use(helmet());
  app.use(mongoSanitize());
  app.use(hpp());

  const limiter = rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW_MS,
    max: config.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
}
