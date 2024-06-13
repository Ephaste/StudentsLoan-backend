import { Fund } from "../models/fundsModel.js";
import { verifyToken } from "../middleWare/verifyToken.js";

// Making a fund or updating an existing one
export const contribute = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const { nId, amount, shares } = req.body;
      req.body.fundOwner = req.userId;

      // Ensure amount and shares are valid integers
      const amountInt = parseInt(amount, 10);
      const sharesInt = parseInt(shares, 10);

      if (isNaN(amountInt) || isNaN(sharesInt)) {
        return res.status(400).json({ error: "Amount and shares must be valid integers" });
      }

      // Check if a fund with the given nId already exists
      let existingFund = await Fund.findOne({ nId });

      if (existingFund) {
        // Update the existing fund
        existingFund.amount += amountInt;
        existingFund.shares += sharesInt;
        await existingFund.save();
        res.status(200).json(existingFund);
      } else {
        // Create a new fund
        const newFund = await Fund.create({ ...req.body, amount: amountInt, shares: sharesInt });
        res.status(201).json(newFund);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Funds
export const getAll = async (req, res) => {
  try {
    const allFunds = await Fund.find({});
    res.status(200).json(allFunds);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Getting only funds made by a particular user
export const getFundsForUser = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const userId = req.userId;
      const userFunds = await Fund.find({ fundOwner: userId }).populate('fundOwner');
      res.status(200).json(userFunds);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET BY ID
export const getbyId = async (req, res) => {
  const fundId = req.params.id;

  try {
    const fund = await Fund.findById(fundId);

    if (!fund) {
      return res.status(404).json({ error: "Fund not found" });
    }

    res.status(200).json(fund);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get by national ID (nId)
export const getbynId = async (req, res) => {
  const nId = req.params.nId;

  try {
    const fund = await Fund.findOne({ nId });

    if (!fund) {
      return res.status(404).json({ error: "This ID has never contributed" });
    }

    res.status(200).json(fund);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
