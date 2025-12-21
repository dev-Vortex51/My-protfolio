import { Schema, model, type Document } from "mongoose";

interface IStats {
  uptime: string;
  commits: number;
  visitors: number;
  lighthouse: number;
}

export interface IPortfolio extends Document {
  name: string;
  role: string;
  bio: string;
  location: string;
  email: string;
  stats: IStats;
}

const statsSchema = new Schema<IStats>({
  uptime: String,
  commits: Number,
  visitors: Number,
  lighthouse: Number,
});

const portfolioSchema = new Schema<IPortfolio>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    stats: { type: statsSchema, required: true },
  },
  { timestamps: true }
);

portfolioSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const Portfolio = model<IPortfolio>("Portfolio", portfolioSchema);
