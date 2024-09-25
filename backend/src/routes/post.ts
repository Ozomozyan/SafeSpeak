import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { Post, PostModel, PostType } from "@/schemas/posts";
import { getPostIdAndIncrement } from "@/database/mongo";

const jsonParser = bodyParser.json();

export function configure(app: Express) {
    app.post(
        "/post/create",
        jsonParser,
        async (req: Request, res: Response) => {
            const data = PostType.safeParse(req.body);

            if (!data.success) {
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const post: Post = data.data;

            const id = getPostIdAndIncrement();
            post.id = id;

            await PostModel.create({ post });
        }
    );

    app.get("/post/:id", async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const post = await PostModel.findOne({ id: id }).exec();

        if (!post) {
            res.status(404).json({ error: "post not found" });
            return;
        }

        res.json(post);
    });

    app.get("/post/:id/replies", async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const posts = await PostModel.find({ replyTo: id }).exec();
        res.json(posts);
    });

    app.get("/post/all", async (_: Request, res: Response) => {
        const posts = await PostModel.find().exec();
        res.json(posts);
    });
}
