import express from "express";
const invoiceRouter = express.Router();
const {
    getAllUserInvoices,
    createInvoice,
    changePaymentInvoice,
    deleteInvoice
} = require("../controllers/invoiceController");

invoiceRouter.get("/:id", getAllUserInvoices);
invoiceRouter.post("/:id", createInvoice);
invoiceRouter.patch("/:id", changePaymentInvoice);
invoiceRouter.delete("/:id", deleteInvoice)
module.exports = invoiceRouter;
