import mongoose from "mongoose";

const paidSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    document: { type: String, required: true }
});

const Paid = mongoose.model("Paid", paidSchema);

export default Paid;
