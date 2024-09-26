import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { UserModel } from "../schemas/users";
import { getUserIdAndIncrement } from "../database/mongo";

const jsonParser = bodyParser.json();

export function configure(app: Express) {
    app.post("/auth/login", jsonParser, async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "missing email or password" });
            return;
        }

        const user = await UserModel.findOne({ email: email }).exec();

        if (!user) {
            res.status(404).json({ error: "user not found" });
            return;
        }

        if (user.password !== password) {
            res.status(401).json({ error: "invalid password" });
            return;
        }

        res.json({ id: user.id });
    });

    app.post(
        "/auth/register",
        jsonParser,
        async (req: Request, res: Response) => {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: "missing email or password" });
                return;
            }

            const user = await UserModel.findOne({ email: email }).exec();

            if (user) {
                res.status(409).json({ error: "user already exists" });
                return;
            }

            const newUser = new UserModel({
                id: getUserIdAndIncrement(),
                email: email,
                password: password,
            });
            await newUser.save();

            res.json({ id: newUser.id });
        }
    );
}
