import type { Request, Response } from "express";
import { ContactMessage } from "../models/ContactMessage.js";

export async function sendMessage(req: Request, res: Response) {
  const msg = await ContactMessage.create(req.body);
  res.status(201).json(msg.toJSON());
}

export async function listMessages(_req: Request, res: Response) {
  const messages = await ContactMessage.find().sort({ timestamp: -1 });
  res.json(messages.map((m) => m.toJSON()));
}

export async function markRead(req: Request, res: Response) {
  const msg = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  if (!msg) return res.status(404).json({ error: "Not found" });
  res.json(msg.toJSON());
}

export async function markAllRead(_req: Request, res: Response) {
  await ContactMessage.updateMany({ read: false }, { read: true });
  const messages = await ContactMessage.find().sort({ timestamp: -1 });
  res.json(messages.map((m) => m.toJSON()));
}

export async function deleteMessage(req: Request, res: Response) {
  const msg = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!msg) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
}
