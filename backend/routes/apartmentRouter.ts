const {
    createApartment,
    getUserApartments,
} = require("../controllers/apartmentController");
import express from "express";
const apartmentRouter = express.Router();
apartmentRouter.get("/:id", getUserApartments);
apartmentRouter.post("/:id", createApartment);

module.exports = apartmentRouter;
