import { Router } from "express";
import {
  sendMessage,
  listMessages,
  markRead,
  markAllRead,
  deleteMessage,
} from "../controllers/contactController.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

export const router = Router();

router.post("/", sendMessage);
router.get("/", requireAuth, requireAdmin, listMessages);
router.post("/mark-all-read", requireAuth, requireAdmin, markAllRead);
router.post("/:id/read", requireAuth, requireAdmin, markRead);
router.delete("/:id", requireAuth, requireAdmin, deleteMessage);
