import express from "express";
const invoiceRouter = express.Router();
const {
    getAllUserInvoices,
    createInvoice,
    changePaymentInvoice,
} = require("../controllers/invoiceController");

invoiceRouter.get("/:id", getAllUserInvoices);
invoiceRouter.post("/:id", createInvoice);
invoiceRouter.patch("/:id", changePaymentInvoice);
module.exports = invoiceRouter;
