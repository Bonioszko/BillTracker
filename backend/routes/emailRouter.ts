import express from "express";

const emailRouter = express.Router();

const { sendEmail } = require("../controllers/emailController");
emailRouter.post("/:id", sendEmail);

module.exports = emailRouter;
