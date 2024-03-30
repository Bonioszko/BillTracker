import mongoose, { Schema } from "mongoose";
import categories from "../helpers/categories";
const InvoiceSchema = new Schema({
    apartment: {
        type: Schema.Types.ObjectId,
        ref: "Apartment",
        required: true,
    },
    category: { type: String, enum: categories, required: true },
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    paidByMe: { type: Boolean, default: false },
    paidByLocator: { type: Boolean, default: false },
});
export default mongoose.model("Invoice", InvoiceSchema);
