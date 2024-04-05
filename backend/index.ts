import { Request, Response, Application } from "express";
import dotenv from "dotenv";
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

//For env File
dotenv.config();
mongoose.connect(process.env.MONGODB_KEY);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const currentDirectory = process.cwd();
const app: Application = express();
app.use(express.static(path.join(currentDirectory, "/frontend/dist")));
const port = process.env.PORT || 8000;
app.use(express.json()); // for parsing application/json
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
    return res.json({ message: "api works" });
});

app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/invoice", require("./routes/invoiceRouter"));
app.use("/api/apartment", require("./routes/apartmentRouter"));
app.use("/api/email", require("./routes/emailRouter"));

app.get("*", (req, res) => {
    res.sendFile(path.join(currentDirectory, "frontend", "dist", "index.html"));
});
