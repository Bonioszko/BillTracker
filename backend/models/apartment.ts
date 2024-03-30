const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ApartmentSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    locator: { type: String, required: true },
});
ApartmentSchema.index({ name: 1, owner: 1 }, { unique: true });

export default mongoose.model("Apartment", ApartmentSchema);
