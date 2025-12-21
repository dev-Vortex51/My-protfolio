import type { Request, Response } from "express";
import { Project } from "../models/Project.js";

export async function listProjects(_req: Request, res: Response) {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects.map((p) => p.toJSON()));
}

export async function getProject(req: Request, res: Response) {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ error: "Not found" });
  res.json(project.toJSON());
}

export async function createProject(req: Request, res: Response) {
  const project = await Project.create(req.body);
  res.status(201).json(project.toJSON());
}

export async function updateProject(req: Request, res: Response) {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!project) return res.status(404).json({ error: "Not found" });
  res.json(project.toJSON());
}

export async function deleteProject(req: Request, res: Response) {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
}

export async function likeProject(req: Request, res: Response) {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  if (!project) return res.status(404).json({ error: "Not found" });
  res.json(project.toJSON());
}

export async function addComment(req: Request, res: Response) {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ error: "Author and text required" });
  }

  const comment = {
    author,
    text,
    timestamp: new Date(),
  };

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: comment } },
    { new: true }
  );

  if (!project) return res.status(404).json({ error: "Not found" });
  res.json(project.toJSON());
}
