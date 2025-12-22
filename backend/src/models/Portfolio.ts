import { Schema, model, type Document } from "mongoose";

interface IStats {
  uptime: string;
  commits: number;
  visitors: number;
  lighthouse: number;
}

interface IExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  logo?: string;
}

interface ISkill {
  id: string;
  name: string;
  level: number;
  category: "frontend" | "backend" | "devops" | "other";
  pid: string;
}

interface ITestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  verified: boolean;
}

interface ILanguage {
  id: string;
  name: string;
  proficiency: "Native" | "Fluent" | "Conversational" | "Limited";
}

interface ISocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface IPortfolio extends Document {
  name: string;
  role: string;
  bio: string;
  headline?: string;
  tagline?: string;
  location: string;
  email: string;
  stats: IStats;
  experiences: IExperience[];
  skills: ISkill[];
  languages: ILanguage[];
  socialLinks: ISocialLinks;
  testimonials: ITestimonial[];
}

const statsSchema = new Schema<IStats>({
  uptime: String,
  commits: Number,
  visitors: Number,
  lighthouse: Number,
});

const experienceSchema = new Schema<IExperience>(
  {
    id: { type: String, required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String },
  },
  { _id: false }
);

const skillSchema = new Schema<ISkill>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    level: { type: Number, required: true },
    category: {
      type: String,
      enum: ["frontend", "backend", "devops", "other"],
      required: true,
    },
    pid: { type: String, required: true },
  },
  { _id: false }
);

const languageSchema = new Schema<ILanguage>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    proficiency: {
      type: String,
      enum: ["Native", "Fluent", "Conversational", "Limited"],
      required: true,
    },
  },
  { _id: false }
);

const socialLinksSchema = new Schema<ISocialLinks>(
  {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    website: { type: String },
  },
  { _id: false }
);

const testimonialSchema = new Schema<ITestimonial>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    content: { type: String, required: true },
    verified: { type: Boolean, default: true },
  },
  { _id: false }
);

const portfolioSchema = new Schema<IPortfolio>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    headline: { type: String },
    tagline: { type: String },
    location: { type: String, required: true },
    email: { type: String, required: true },
    stats: { type: statsSchema, required: true },
    experiences: { type: [experienceSchema], default: [] },
    skills: { type: [skillSchema], default: [] },
    languages: { type: [languageSchema], default: [] },
    socialLinks: { type: socialLinksSchema, default: {} },
    testimonials: { type: [testimonialSchema], default: [] },
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
