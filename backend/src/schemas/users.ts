import z from "zod";
import mongoose, { Schema } from "mongoose";

// Zod schema for validation
export const UserType = z.object({
    id: z.string(),               // User ID (could be auto-generated)
    email: z.string(),            // Email (for login)
    password: z.string(),         // Hashed password
    displayName: z.string().nullish(), // Optional real name that users can reveal
    createdAt: z.date(),          // User creation date
    lastLogin: z.date().nullish(),    // Last login date (optional)
});

// Mongoose schema for MongoDB
export const UserSchema = new Schema({
    id: { type: String, required: true },          // User ID
    email: { type: String, required: true },       // Email
    password: { type: String, required: true },    // Hashed password
    displayName: { type: String, required: false },  // Optional real name
    createdAt: { type: Date, default: Date.now },  // Automatically set creation date
    lastLogin: { type: Date, required: false },    // Last login timestamp
});

// TypeScript type inference from Zod schema
export type User = z.infer<typeof UserType>;

// Mongoose model for interacting with MongoDB
export const UserModel = mongoose.model("Users", UserSchema);
