import bcrypt from "bcryptjs";
import { config } from "../config/env.js";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(config.BCRYPT_SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
