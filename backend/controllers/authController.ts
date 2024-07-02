import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { SentMessageInfo } from "nodemailer";
const crypto = require("crypto");
const nodemailer = require("nodemailer");
dotenv.config();
interface UserPayload {
    id: string;
}
const test = (req: Request, res: Response) => {
    res.json("test is working ");
};

const signInUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password) {
            res.status(400).json({ error: "Please provide all fields" });
            return;
        }

        // Check if email is valid
        if (!/\S+@\S+\.\S+/.test(email)) {
            res.status(400).json({ error: "Please provide a valid email" });
            return;
        }

        try {
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ error: "User already exists" });
                return;
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const user = new User({
                name,
                email,
                password: hashedPassword,
            });

            // Save the user
            const result = await user.save();

            // Send success response
            res.status(200).json({ message: "user created successfully" });
        } catch (err) {
            next(err);
        }
    }
);

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "no user found" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: "passwords do not match" });
        } else {
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET is not defined");
            }

            jwt.sign(
                {
                    email: user.email,
                    id: user._id,
                    name: user.name,
                },
                process.env.JWT_SECRET,
                { expiresIn: "1d" },
                (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token).json(user);
                }
            );
        }
    } catch (err) {
        next(err);
    }
};

const getProfile = async (req: Request, res: Response) => {
    const { token } = req.cookies;

    if (token) {
        try {
            const user: UserPayload = jwt.verify(
                token,
                process.env.JWT_SECRET || "default_secret"
            ) as UserPayload;
            const userReturn = await User.findOne({ _id: user.id });

            return res.json(userReturn);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                // The token has expired
                res.status(401).json({
                    error: "Session expired. Please log in again.",
                });
            } else {
                // Some other error occurred
                res.status(500).json({
                    error: "An error occurred while verifying the token.",
                });
            }
        }
    } else {
        res.json(null);
    }
};
const logout = async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({ logout: true });
};
const forget = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({
                error: "This email does not correspond to any account",
            });
        } else {
            const token = crypto.randomBytes(20).toString("hex");

            try {
                await User.updateMany({ email }, { $set: { token: token } });
                console.log("Token updated successfully");
            } catch (error) {
                console.error(`Failed to update token: ${error}`);
            }

            const transporter = nodemailer.createTransport({
                port: 465, // true for 465, false for other ports
                host: "smtp.gmail.com",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
                secure: true,
            });
            const mailData = {
                from: process.env.EMAIL,
                to: email,
                subject: "reset password",
                text: "reset password",
                html: `<a href='http://localhost:5173/reset/${token}'>Reset Password</a>`,
            };
            transporter.sendMail(
                mailData,
                (err: Error | null, info: SentMessageInfo) => {
                    if (err) {
                        console.error(
                            `Error occurred when sending email: ${err.message}`
                        );
                        res.status(500).json({ error: "Failed to send email" });
                    } else {
                        console.log(`Email sent: ${info.response}`);
                        res.status(200).json({
                            message: "Email successfully sent",
                        });
                        return;
                    }
                }
            );
        }
    } catch (err) {
        console.log(err);
    }
};
const checkToken = async (req: Request, res: Response) => {};
const reset = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        console.log(token);
        const user = await User.findOne({ email: "bartek.pers@gmail.com" });
        console.log(user);
        if (!user) {
            return res.status(400).json({
                error: "Not a valid tokent",
            });
        } else {
            return res.status(200).json({
                message: "ok",
            });
        }
    } catch (err) {
        console.log(err);
    }
};
module.exports = {
    test,
    signInUser,
    loginUser,
    logout,
    getProfile,
    forget,
    reset,
};
