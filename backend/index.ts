import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
const mongoose = require("mongoose");
import User from "./models/user";

//For env File
dotenv.config();
mongoose.connect(process.env.MONGODB_KEY);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
    return res.json({ message: "api works" });
});

app.use("/api/auth", require("./routes/authRouter"));

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
