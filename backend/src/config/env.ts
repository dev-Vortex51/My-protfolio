import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  MONGO_URI: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES: z.string().default("15m"),
  JWT_REFRESH_EXPIRES: z.string().default("7d"),
  CORS_ORIGIN: z
    .string()
    .default(
      "http://localhost:5173,https://my-protfolio-gules-five.vercel.app"
    ),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(15 * 60 * 1000),
  RATE_LIMIT_MAX: z.coerce.number().default(100),
  LOGIN_RATE_LIMIT_WINDOW_MS: z.coerce.number().default(5 * 60 * 1000),
  LOGIN_RATE_LIMIT_MAX: z.coerce.number().default(5),
  BCRYPT_SALT_ROUNDS: z.coerce.number().min(10).max(15).default(12),
});

const parsed = EnvSchema.parse(process.env);

export const config = {
  ...parsed,
  CORS_ORIGIN: parsed.CORS_ORIGIN.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};
