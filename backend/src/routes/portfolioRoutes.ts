import { Router } from "express";
import {
  getPortfolio,
  updatePortfolio,
} from "../controllers/portfolioController.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

export const router = Router();

router.get("/", getPortfolio);
router.put("/", requireAuth, requireAdmin, updatePortfolio);
