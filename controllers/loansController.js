import  {Loan}  from "../models/loansModel.js";
import { verifyToken } from "../middleWare/verifyToken";
  


//Apply for loan
export const applyLoan = async (req, res) => {
  try {
      // Check the user token using the verifyToken middleware
      verifyToken(req, res, async () => {
          const loanData = req.body;
          req.body.loanOwner = req.userId
          const newLoan = await Loan.create(loanData);

          console.log(newLoan);
          res.status(201).json(newFund);
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
};
  //Getting loans made by a prticular user.
export const getLoansForUser = async (req, res) => {
  try {
    // Call the verifyToken middleware to extract user ID from the token
    verifyToken(req, res, async () => {
      // User ID is now available in req.userId from verifyToken middleware
      const userId = req.userId;
      // Find hives created by the user
      let userLoans = await Loan.find({ loanOwner: userId }).populate('loanOwner');
      res.status(200).json(userLoans);
    });
  } catch (error) {
    // Handle token verification or database errors
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get All Loans applications
export const getAll = async (req, res) => {
  try {
    let allLoans = await Loan.find({});
    res.status(200).json(allLoans);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//GET BY ID
export const getbyId = async (req, res) => {
    const loanId = req.params.id; // Assuming the ID is passed as a URL parameter
  
    try {
      const LOAN = await Loan.findById(loanId);
  
      if (!LOAN) {
        return res.status(404).json({ error: "loan is not found" });
      }
  
      res.status(200).json(LOAN);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
  //UPDATE A LOAN


  export const updateLoan = async (req, res) => {
    const loanId = req.params.id; // Assuming the ID is passed as a URL parameter
    const updatedData = req.body;
  
    try {
      const foundLoan= await Loan.findById(loanId);
  
      if (!foundLoan) {
        return res.status(404).json({ error: "loan is not found" });
      }
  
      // Update the foundCase object with the provided data
      Object.assign(foundLoan, updatedData);
  
      // Save the updated case
      const updatedLoan = await foundLoan.save();
  
      res.status(200).json(updatedLoan);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };