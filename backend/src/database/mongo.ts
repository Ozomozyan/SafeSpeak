import { PostModel } from "@/schemas/posts";
import { UserModel } from "@/schemas/users";
import mongoose, { model } from "mongoose";

let userId = 0;
let postId = 0;

export async function init(uri: string) {
    await mongoose.connect(uri, {
        serverApi: { version: "1", strict: true, deprecationErrors: true },
        zlibCompressionLevel: 6,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 30000,
    });

    mongoose.connection.on(
        "error",
        console.error.bind(console, "mongo error:")
    );

    mongoose.connection.on("open", async () => {
        console.log("mongo connected");

        userId = await UserModel.countDocuments().exec();
        userId++;

        postId = await PostModel.countDocuments().exec();
        postId++;
    });
}

export function getUserIdAndIncrement(): number {
    const id = userId;
    userId++;
    return id;
}

export function getPostIdAndIncrement(): number {
    const id = postId;
    postId++;
    return id;
}
