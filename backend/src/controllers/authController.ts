import type { Request, Response } from "express";
import { User } from "../models/User.js";
import { RefreshToken } from "../models/RefreshToken.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { z } from "zod";
import crypto from "node:crypto";
import { config } from "../config/env.js";

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
  }),
});

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse({ body: req.body });
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
  const { email, password, name } = parsed.data.body;

  const existing = await User.findOne({ email });
  if (existing)
    return res.status(409).json({ error: "Email already registered" });

  const passwordHash = await hashPassword(password);
  const user = await User.create({ email, passwordHash, name, role: "admin" });

  const accessToken = signAccessToken(user.id, user.role);
  const refreshToken = signRefreshToken(user.id, user.role);
  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  const payload = verifyRefreshToken(refreshToken);
  const expiresAt = new Date(Date.now() + ms(config.JWT_REFRESH_EXPIRES));

  await RefreshToken.create({ userId: user._id, tokenHash, expiresAt });
  return res
    .status(201)
    .json({ user: user.toJSON(), accessToken, refreshToken });
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse({ body: req.body });
  if (!parsed.success)
    return res.status(400).json({ error: "Invalid credentials" });
  const { email, password } = parsed.data.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const accessToken = signAccessToken(user.id, user.role);
  const refreshToken = signRefreshToken(user.id, user.role);
  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  const expiresAt = new Date(Date.now() + ms(config.JWT_REFRESH_EXPIRES));

  await RefreshToken.create({ userId: user._id, tokenHash, expiresAt });
  return res
    .status(200)
    .json({ user: user.toJSON(), accessToken, refreshToken });
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body as { refreshToken?: string };
  if (!refreshToken)
    return res.status(400).json({ error: "Missing refreshToken" });

  try {
    const payload = verifyRefreshToken(refreshToken);
    const tokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    const stored = await RefreshToken.findOne({ tokenHash, revoked: false });
    if (!stored)
      return res.status(401).json({ error: "Invalid refresh token" });

    const userId = payload.sub;
    const accessToken = signAccessToken(userId, payload.role);

    // Rotate refresh token
    stored.revoked = true;
    await stored.save();
    const newRefreshToken = signRefreshToken(userId, payload.role);
    const newHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");
    const expiresAt = new Date(Date.now() + ms(config.JWT_REFRESH_EXPIRES));
    await RefreshToken.create({ userId, tokenHash: newHash, expiresAt });

    return res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } catch {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
}

export async function logout(req: Request, res: Response) {
  const { refreshToken } = req.body as { refreshToken?: string };
  if (!refreshToken)
    return res.status(400).json({ error: "Missing refreshToken" });
  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  await RefreshToken.updateOne({ tokenHash }, { $set: { revoked: true } });
  return res.status(200).json({ success: true });
}

function ms(duration: string): number {
  // Simplistic parser: supports s, m, h, d
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) return 0;
  const value = Number(match[1]);
  const unit = match[2];
  switch (unit) {
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
}
