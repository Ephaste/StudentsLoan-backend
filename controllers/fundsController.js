import  {Fund}  from "../models/fundsModel.js";
import { verifyToken } from "../middleWare/verifyToken.js";




//Making a fund
export const contribute = async (req, res) => {
  try {
      // Check the user token using the verifyToken middleware
      verifyToken(req, res, async () => {
          const fundData = req.body;
          req.body.fundOwner = req.userId
          const newFund = await Fund.create(fundData);

          console.log(newFund);
          res.status(201).json(newFund);
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
};
  
  
//Get All Funds
export const getAll = async (req, res) => {
  try {
    let allFunds = await Fund.find({});
    res.status(200).json(allLoans);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//Getting onnly funds made by a particular user.
export const getFundsForUser = async (req, res) => {
  try {
    // Call the verifyToken middleware to extract user ID from the token
    verifyToken(req, res, async () => {
      // User ID is now available in req.userId from verifyToken middleware
      const userId = req.userId;
      // Find hives created by the user
      let userFunds = await Fund.find({ fundOwner: userId }).populate('fundOwner');

      res.status(200).json(userFunds);
    });
  } catch (error) {
    // Handle token verification or database errors
    res.status(500).json({ error: "Internal server error" });
  }
};

//GET BY ID
export const getbyId = async (req, res) => {
    const fundId = req.params.id; // Assuming the ID is passed as a URL parameter
  
    try {
      const FUND= await Fund.findById(fundId);
  
      if (!FUND) {
        return res.status(404).json({ error: "fund is not found" });
      }
  
      res.status(200).json(FUND);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
