import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { Post, PostModel, PostType } from "../schemas/posts";
import { getPostIdAndIncrement } from "../database/mongo";

const jsonParser = bodyParser.json();

export function configure(app: Express) {
    // Create Post or Reply
    app.post("/post/create", jsonParser, async (req: Request, res: Response) => {
        const data = PostType.safeParse(req.body);

        if (!data.success) {
            res.status(400).json({ error: "invalid data" });
            return;
        }

        const post: Post = data.data;

        const id = getPostIdAndIncrement();
        post.id = id;

        await PostModel.create({
            id: post.id,
            title: post.title,
            content: post.content,
            userId: post.userId,
            userName: post.userName,
            replyTo: post.replyTo,  // Reply to another post if replyTo is not null
            createdAt: post.createdAt,
        });

        res.json(post);
    });

    // Get all top-level posts (articles)
    app.get("/post/all", async (_: Request, res: Response) => {
        // Only return posts that are not replies (i.e., where replyTo is null)
        const posts = await PostModel.find({ replyTo: null }).exec();
        res.json(posts);
    });

    // Get a specific post by ID
    app.get("/post/:id", async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const post = await PostModel.findOne({ id: id }).exec();

        if (!post) {
            res.status(404).json({ error: "post not found" });
            return;
        }

        res.json(post);
    });

    // Get replies to a specific post
    app.get("/post/:id/replies", async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const posts = await PostModel.find({ replyTo: id }).exec();
        res.json(posts);
    });
}
