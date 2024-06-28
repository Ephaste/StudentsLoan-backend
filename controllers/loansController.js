import { Loan } from "../models/loansModel.js";
import { verifyToken } from "../middleWare/verifyToken.js";
import { Fund } from "../models/fundsModel.js";
import { User } from "../models/userModel.js";
import Paid from '../models/paidModel.js';

export const applyLoan = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const loanData = req.body;
      const userId = req.userId;

      console.log("User ID from token:", userId);
      console.log("Request body:", req.body);

      const user = await User.findById(userId);
      console.log("User found:", user);

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      // Use the user.regno instead of loanData.regno
      if (user.regno !== loanData.regno) {
        console.log("Invalid registration number:", loanData.regno);
        return res.status(400).json({ error: "Invalid registration number" });
      }

      const userSavings = await Fund.findOne({ fundOwner: userId });
      console.log("User savings:", userSavings);

      if (!userSavings) {
        return res.status(400).json({ error: "User has no savings." });
      }
      if (userSavings.received !== "yes") {
        return res.status(400).json({ error: "Wait for an admin to approve your saving" });
      }

      const loanAmountTopay = parseFloat(loanData.amount);
      const loanAmount = parseFloat(loanData.loan);
      const requiredSavings = loanAmount * 0.60;

      if (userSavings.amount < requiredSavings) {
        return res.status(400).json({ error: `Insufficient savings. You need at least ${requiredSavings} in savings to apply for this loan.` });
      }

      loanData.loanOwner = userId;
      loanData.remainingAmount = loanAmountTopay;

      const newLoan = await Loan.create(loanData);

      res.status(201).json(newLoan);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// Getting loans made by a particular user
export const getLoansForMember = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const userId = req.userId;
      let userLoans = await Loan.find({ loanOwner: userId }).populate('loanOwner');
      res.status(200).json(userLoans);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Loans applications
export const getAll = async (req, res) => {
  try {
    let allLoans = await Loan.find({});
    res.status(200).json(allLoans);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get loan by ID
export const getbyId = async (req, res) => {
  const loanId = req.params.id;

  try {
    const LOAN = await Loan.findById(loanId);

    if (!LOAN) {
      return res.status(404).json({ error: "Loan not found" });
    }

    res.status(200).json(LOAN);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateLoan = async (req, res) => {
  const loanId = req.params.id;
  const updatedData = req.body;

  try {
    const foundLoan = await Loan.findById(loanId);

    if (!foundLoan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    const prevStatus = foundLoan.status;
    Object.assign(foundLoan, updatedData);

    // Update remaining amount and total paid if status is changed to "paid" or "partially-paid"
    if ((prevStatus !== 'paid' && updatedData.status === 'paid') || 
        (prevStatus !== 'inst1-paid' && updatedData.status === 'inst1-paid') ||
        (prevStatus !== 'inst2-paid' && updatedData.status === 'inst2-paid') ||
        (prevStatus !== 'inst3-paid' && updatedData.status === 'inst3-paid') ||
        (prevStatus !== 'inst4-paid' && updatedData.status === 'inst4-paid')
      ) {
      const payments = await Paid.find({ name: foundLoan.name });

      let totalPaid = 0;
      payments.forEach(payment => {
        totalPaid += parseFloat(payment.amount);
      });

      foundLoan.totalPaid = totalPaid;
      foundLoan.remainingAmount = Math.max(0, foundLoan.amount - totalPaid);
    }

    const updatedLoan = await foundLoan.save();
    res.status(200).json(updatedLoan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
