import { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { UserModel } from "../schemas/users";
import { getUserIdAndIncrement } from "../database/mongo";
import CryptoJS from 'crypto-js'; // For decrypting passwords
import bcrypt from 'bcrypt'; // For hashing and verifying passwords

const jsonParser = bodyParser.json();
const secretKey = "mySecretKey"; // Same secret key used on the frontend

// Decrypt password function
const decryptPassword = (encryptedPassword: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export function configure(app: Express) {
    // Login route
    app.post("/auth/login", jsonParser, async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "missing email or password" });
            return;
        }

        // Find the user by email
        const user = await UserModel.findOne({ email: email }).exec();
        if (!user) {
            res.status(404).json({ error: "user not found" });
            return;
        }

        // Decrypt the encrypted password sent from the frontend
        const decryptedPassword = decryptPassword(password);

        // Compare the decrypted password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(decryptedPassword, user.password);
        if (!passwordMatch) {
            res.status(401).json({ error: "invalid password" });
            return;
        }

        // If password matches, return the user ID
        res.json({ id: user.id });
    });

    // Registration route
    app.post("/auth/register", jsonParser, async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "missing email or password" });
            return;
        }

        // Check if the user already exists
        const user = await UserModel.findOne({ email: email }).exec();
        if (user) {
            res.status(409).json({ error: "user already exists" });
            return;
        }

        // Decrypt the encrypted password from the frontend
        const decryptedPassword = decryptPassword(password);

        // Hash the decrypted password
        const hashedPassword = await bcrypt.hash(decryptedPassword, 10);

        // Store the hashed password in the database
        const newUser = new UserModel({
            id: getUserIdAndIncrement(),
            email: email,
            password: hashedPassword, // Store hashed password
        });
        await newUser.save();

        res.json({ id: newUser.id });
    });

    app.post("/auth/logout", (req: Request, res: Response) => {
        // In stateless authentication, we don't need to manage anything on the server side for logout
        res.status(200).json({ message: "Logged out successfully" });
    });
    
}
