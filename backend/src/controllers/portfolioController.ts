import type { Request, Response } from "express";
import { Portfolio } from "../models/Portfolio.js";

export async function getPortfolio(_req: Request, res: Response) {
  let doc = await Portfolio.findOne();
  if (!doc) {
    doc = await Portfolio.create({
      name: "VORTEX",
      role: "Lead Software Architect",
      bio: "Engineering high-performance distributed systems and design-driven interfaces.",
      headline: "ENGINEERING FOR THE INFINITE SCALE",
      tagline:
        "Architecting robust digital infrastructure with a focus on low-latency, scalability, and human-centric design.",
      location: "San Francisco, CA",
      email: "engineering@vortex.io",
      stats: {
        uptime: "99.99%",
        commits: 2481,
        visitors: 12402,
        lighthouse: 100,
      },
      experiences: [
        {
          id: "e1",
          company: "Linear",
          role: "Senior Frontend Engineer",
          period: "2022 - PRESENT",
          description:
            "Leading the core interactions team, focusing on high-performance desktop-grade web experiences.",
        },
      ],
      skills: [
        {
          id: "s1",
          name: "REACT CORE",
          level: 98,
          category: "frontend",
          pid: "8821",
        },
        {
          id: "s2",
          name: "RUST SYSTEMS",
          level: 85,
          category: "backend",
          pid: "4112",
        },
      ],
      testimonials: [
        {
          id: "t1",
          name: "Sarah Jenkins",
          role: "Director of Engineering",
          company: "Tech Inc",
          content:
            "Vortex delivered production-grade systems with impeccable UX and reliability.",
          verified: true,
        },
      ],
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
