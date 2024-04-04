import express from "express";

const emailRouter = express.Router();

const { sendEmail } = require("../controllers/emailController");
emailRouter.get("/:id", sendEmail);

module.exports = emailRouter;
