import type { Request, Response } from "express";
import { Portfolio } from "../models/Portfolio.js";

export async function getPortfolio(_req: Request, res: Response) {
  let doc = await Portfolio.findOne();
  if (!doc) {
    doc = await Portfolio.create({
      name: "VORTEX",
      role: "Lead Software Architect",
      bio: "Engineering high-performance distributed systems and design-driven interfaces.",
      location: "San Francisco, CA",
      email: "engineering@vortex.io",
      stats: {
        uptime: "99.99%",
        commits: 2481,
        visitors: 12402,
        lighthouse: 100,
      },
    });
  }
  res.json(doc.toJSON());
}

export async function updatePortfolio(req: Request, res: Response) {
  const doc = await Portfolio.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
  });
  res.json(doc.toJSON());
}
