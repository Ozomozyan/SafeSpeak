import z from "zod";
import mongoose, { Schema } from "mongoose";

export const UserType = z.object({
    id: z.string(),
    email: z.string(),
    password: z.string(),
});

export const UserSchema = new Schema({
    id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export type User = z.infer<typeof UserType>;
export const UserModel = mongoose.model("Users", UserSchema);
