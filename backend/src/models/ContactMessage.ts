import { Schema, model, type Document } from "mongoose";

export interface IContactMessage extends Document {
  sender: string;
  email: string;
  subject: string;
  body: string;
  priority: "Low" | "Normal" | "Urgent";
  timestamp: Date;
  read: boolean;
}

const contactSchema = new Schema<IContactMessage>({
  sender: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  priority: {
    type: String,
    enum: ["Low", "Normal", "Urgent"],
    default: "Normal",
  },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

contactSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    Reflect.deleteProperty(ret, "_id");
    Reflect.deleteProperty(ret, "__v");
  },
});

export const ContactMessage = model<IContactMessage>(
  "ContactMessage",
  contactSchema
);
