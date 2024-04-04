import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Apartment from "../models/apartment";
import User from "../models/user";

const createApartment = asyncHandler(async (req: Request, res: Response) => {
    const { name, description, tenant } = req.body;

    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
        res.status(400).json({ error: "user do not exists" });
        return;
    }
    const apartment = new Apartment({
        name: name,
        description: description,
        owner: user,
        tenant: tenant,
    });
    const result = await apartment.save();
    res.status(200).json({ message: "Apartment succesfully added" });
    return;
});
const getUserApartments = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) {
            res.status(400).json({ error: "user do not exists" });
            return;
        }
        const apartments = await Apartment.find({ owner: user });
        res.status(200).json({
            apartments: apartments,
        });
    }
);
module.exports = {
    createApartment,
    getUserApartments,
};
