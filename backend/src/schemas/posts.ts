import z from "zod";
import mongoose, { Schema } from "mongoose";

// Zod schema for validation
export const PostType = z.object({
    title: z.string(),
    content: z.string(),
    userId: z.string(),         // Reference to the user who posted
    createdAt: z.date(),        // Timestamp of post creation
    userName: z.string().nullish(), // Username (anonymous or real)
    replyTo: z.string().nullish(),  // If this post is a reply, store the parent postId
});

// Mongoose schema for MongoDB
export const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: false },  // Optional: anonymous name or real name
    replyTo: { type: String, required: false },   // Optional: parent post ID for replies
    createdAt: { type: Date, default: Date.now }, // Automatically set creation date
});

// TypeScript type inference from Zod schema
export type Post = z.infer<typeof PostType>;

// Mongoose model for interacting with MongoDB
export const PostModel = mongoose.model("Posts", PostSchema);
