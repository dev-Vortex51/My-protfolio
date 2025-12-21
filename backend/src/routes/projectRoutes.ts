import { Router } from "express";
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
  addComment,
} from "../controllers/projectController.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

export const router = Router();

router.get("/", listProjects);
router.get("/:id", getProject);
router.post("/", requireAuth, requireAdmin, createProject);
router.put("/:id", requireAuth, requireAdmin, updateProject);
router.delete("/:id", requireAuth, requireAdmin, deleteProject);
router.post("/:id/like", likeProject);
router.post("/:id/comments", addComment);
