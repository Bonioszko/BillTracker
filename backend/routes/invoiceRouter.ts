import express from "express";
const invoiceRouter = express.Router();
const {
    getAllUserInvoices,
    createInvoice,
} = require("../controllers/invoiceController");

invoiceRouter.get("/:id", getAllUserInvoices);
invoiceRouter.post("/:id", createInvoice);
module.exports = invoiceRouter;
