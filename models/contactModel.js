import mongoose from "mongoose";
const contactSchema = mongoose.Schema({
    email: String,
    name: String,
    message: String,
    document: String
});
export const Contact =mongoose.model("Contact", contactSchema);