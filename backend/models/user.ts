import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String },
});
export default mongoose.model("User", UserSchema);
