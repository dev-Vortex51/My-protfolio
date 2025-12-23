import { Schema, model, type Document } from "mongoose";

interface IComment {
  author: string;
  text: string;
  timestamp: Date;
}

interface IMetrics {
  stars: number;
  forks: number;
  coverage: string;
}

export interface IProject extends Document {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  image: string;
  featured: boolean;
  version?: string;
  status: "production" | "beta" | "archived";
  metrics?: IMetrics;
  likes: number;
  comments: IComment[];
}

const commentSchema = new Schema<IComment>({
  author: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const metricsSchema = new Schema<IMetrics>({
  stars: { type: Number, default: 0 },
  forks: { type: Number, default: 0 },
  coverage: { type: String, default: "0%" },
});

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    link: { type: String, required: true },
    github: { type: String },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false },
    version: { type: String },
    status: {
      type: String,
      enum: ["production", "beta", "archived"],
      default: "production",
    },
    metrics: { type: metricsSchema, required: false },
    likes: { type: Number, default: 0 },
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true }
);

projectSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    Reflect.deleteProperty(ret, "_id");
    Reflect.deleteProperty(ret, "__v");
  },
});

export const Project = model<IProject>("Project", projectSchema);
