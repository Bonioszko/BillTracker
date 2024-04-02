import User from "../models/user";
import Apartment from "../models/apartment";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import asyncHandler from "express-async-handler";
import Invoice from "../models/invoice";
type ApartmentType = {
    _id: ObjectId;
};
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
    const { category, apartment, name, date, amount } = req.body;

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
            amount: amount,
        });
        const result = await invoice.save();
        res.status(200).json({ message: "Apartment succesfully added" });
        return;
    }
});
const deleteInvoice = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const invoice = await Invoice.findByIdAndDelete(id);

    if (!invoice) {
        res.status(404);
        throw new Error("Invoice not found");
    }

    res.status(204).json({ message: "Invoice deleted successfully" });
});
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
type Summary = {
    paidByMeCount: number;
    paidByLocatorCount: number;
    totalAmountToPay: number;
    totalAmountToReceive: number;
    difference: number;
};
const getInvoiceSummary = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
        res.status(400).json({ error: "User does not exist" });
        return;
    }
    const apartments = await Apartment.find({ owner: user }).select("_id");
    const apartmentIds = apartments.map(
        (apartment: ApartmentType) => apartment._id
    );
    console.log(apartments);
    // const apartmentIds = apartments.map(apartment => apartment._id);
    let summary: Summary = {
        paidByMeCount: 0,
        paidByLocatorCount: 0,
        totalAmountToPay: 0,
        totalAmountToReceive: 0,
        difference: 0,
    };
    const result = await Invoice.aggregate([
        { $match: { apartment: { $in: apartmentIds } } },
        {
            $group: {
                _id: null,
                paidByMeCount: {
                    $sum: { $cond: [{ $eq: ["$paidByMe", true] }, 1, 0] },
                },
                paidByLocatorCount: {
                    $sum: { $cond: [{ $eq: ["$paidByLocator", true] }, 1, 0] },
                },
                totalAmountToPay: {
                    $sum: {
                        $cond: [{ $eq: ["$paidByMe", false] }, "$amount", 0],
                    },
                },
                totalAmountToReceive: {
                    $sum: {
                        $cond: [
                            { $eq: ["$paidByLocator", false] },
                            "$amount",
                            0,
                        ],
                    },
                },
            },
        },
    ]);

    if (result.length > 0) {
        summary = result[0];
    }
    summary.difference =
        summary.totalAmountToReceive - summary.totalAmountToPay;
    console.log(summary);
    res.status(200).json({
        summary: summary,
    });
});
module.exports = {
    getAllUserInvoices,
    createInvoice,
    changePaymentInvoice,
    deleteInvoice,
    getInvoiceSummary,
};
