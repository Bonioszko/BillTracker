import User from "../models/user";
import Apartment from "../models/apartment";
import { Request, Response, NextFunction } from "express";

import asyncHandler from "express-async-handler";
import Invoice from "../models/invoice";
const getAllUserInvoices = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
        res.status(400).json({ error: "User does not exist" });
        return;
    }
    const apartments = await Apartment.find({ owner: user });
    let invoices = [];
    for (let index = 0; index < apartments.length; index++) {
        const temp = await Invoice.find({ apartment: apartments[index] });

        for (let j = 0; j < temp.length; j++) {
            const element = temp[j];

            invoices.push(element);
        }
    }
    res.status(200).json({
        invoices: invoices,
    });
});
const createInvoice = asyncHandler(async (req: Request, res: Response) => {
    const { category, apartment, name, date } = req.body;

    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    const apartmentOfUser = await Apartment.findOne({
        owner: user,
        _id: apartment,
    });
    if (!user || !apartment) {
        res.status(400).json({ error: "not valid user or apartments" });
    } else {
        const invoice = new Invoice({
            apartment: apartmentOfUser,
            name: name,
            category: category,
            date: date,
        });
        const result = await invoice.save();
        res.status(200).json({ message: "Apartment succesfully added" });
        return;
    }
});
const deleteInvoice = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

       
        const invoice = await Invoice.findByIdAndDelete(id);

        if (!invoice) {
            res.status(404);
            throw new Error('Invoice not found');
        }

        res.status(204).json({ message: 'Invoice deleted successfully' });
    }
);
const changePaymentInvoice = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { byLocator } = req.body;

        const invoice = await Invoice.findById(id);
        if (invoice) {
            let updatedInvoice;
            if (!byLocator) {
                updatedInvoice = await Invoice.findByIdAndUpdate(
                    id,
                    {
                        paidByMe: !invoice.paidByMe,
                    },
                    { new: true }
                );
            } else {
                updatedInvoice = await Invoice.findByIdAndUpdate(
                    id,
                    {
                        paidByLocator: !invoice.paidByLocator,
                    },
                    { new: true }
                );
            }

            if (updatedInvoice) {
                res.status(200).json({ message: "Invoice updated" });
            } else {
                res.status(500).json({ message: "Error updating invoice" });
            }
        } else {
            res.status(404).json({
                message: `Invoice with id ${id} not found`,
            });
        }
    }
);
module.exports = {
    getAllUserInvoices,
    createInvoice,
    changePaymentInvoice,
    deleteInvoice,
};
