import mongoose from "mongoose";

const loansSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add a name"],
  },
  regno: {
    type: String,
  },
  loanOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  loan: {
    type: String,
  },
  months: {
    type: String,
  },
  paymentWay: {
    type: String,
  },
  amount: {
    type: Number,
  },
  status: {
    type: String,
    default: "pending",
  },
  remainingAmount: {
    type: Number,
    required: true,
  },
  totalPaid: {
    type: Number,
    default: 0,
  },
},
{
    timestamps: true,
});

export const Loan = mongoose.model("Loan", loansSchema);
