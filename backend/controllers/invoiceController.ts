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
        invoices.push(temp);
    }
    res.status(400).json({
        invoices: invoices,
    });
});
const createInvoice = asyncHandler(async (req: Request, res: Response) => {
    const { category, apartment, name, date } = req.body;
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    const apartmentOfUser = await Apartment.findOne({
        owner: user,
        name: apartment,
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
module.exports = {
    getAllUserInvoices,
    createInvoice,
};
