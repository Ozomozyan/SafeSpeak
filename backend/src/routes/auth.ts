import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { UserModel } from "@/schemas/users";
import bcrypt from "bcrypt";


const jsonParser = bodyParser.json();

export function configure(app: Express) {
    // User login route
    app.post("/auth/login", jsonParser, async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Missing email or password" });
            return;
        }

        const user = await UserModel.findOne({ email: email }).exec();
        
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        // Compare hashed password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({ error: "Invalid password" });
            return;
        }

        // Generate a random anonymous name upon login
        const anonymousName = `User${Math.floor(Math.random() * 10000)}`;

        res.json({ id: user.id, anonymousName: anonymousName });
    });

    // User registration route
    app.post("/auth/register", jsonParser, async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Missing email or password" });
            return;
        }

        const userExists = await UserModel.findOne({ email: email }).exec();

        if (userExists) {
            res.status(409).json({ error: "User already exists" });
            return;
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ email, password: hashedPassword });
        await newUser.save();

        res.json({ id: newUser.id });
    });
}
