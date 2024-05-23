import { Funds } from "../models/fundsModel.js";
const PaypackJs = require("paypack-js").default; // Update import statement
import dotenv from "dotenv";

dotenv.config();

const paypack = PaypackJs.config({ 
    client_id: process.env.APPLICATION_ID,
    client_secret: process.env.APPLICATION_SECRET,
});
console.log("--------------================-", process.env.APPLICATION_SECRET);
export const contribute = async (req, res) => {
  try {
    const FUND = req.body;
    // Assuming the amount is specified in the request body
    const amount = FUND.amount;
  

    // Call the paypack.cashin method to process the payment
    paypack.cashin({
      number: req.body.number, // Assuming the user's number is provided in the request body
      amount: amount,
      environment: "production",
    })
    .then(async (response) => {
      // Once payment is successful, create the fund record
      const newFund = await Funds.create(FUND);
      console.log(newFund);
      res.status(201).json(newFund);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Payment failed" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
