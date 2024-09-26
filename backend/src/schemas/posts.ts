import z from "zod";
import mongoose, { Schema } from "mongoose";

export const PostType = z.object({
    id: z.number().default(0),
    title: z.string(),
    content: z.string(),
    userId: z.string(),
    createdAt: z.date().or(z.string()),
    userName: z.string().nullish(),
    replyTo: z.string().nullish(),
});

export const PostSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: false },
    replyTo: { type: String, required: false },
    createdAt: { type: Date, required: false },
});

export type Post = z.infer<typeof PostType>;
export const PostModel = mongoose.model("Posts", PostSchema);
