import { Router } from "express";
import {
  login,
  register,
  refresh,
  logout,
} from "../controllers/authController.js";
import rateLimit from "express-rate-limit";
import { config } from "../config/env.js";

export const router = Router();

const loginLimiter = rateLimit({
  windowMs: config.LOGIN_RATE_LIMIT_WINDOW_MS,
  max: config.LOGIN_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.post("/refresh", refresh);
router.post("/logout", logout);
