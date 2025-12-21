import { Router } from "express";
import {
  sendMessage,
  listMessages,
  markRead,
} from "../controllers/contactController.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

export const router = Router();

router.post("/", sendMessage);
router.get("/", requireAuth, requireAdmin, listMessages);
router.post("/:id/read", requireAuth, requireAdmin, markRead);
