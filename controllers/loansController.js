import  {Loan}  from "../models/loansModel.js";
  export const  applyLoan = async(req, res) =>{
    try{
      let LOAN = req.body;
      let newLoan = await car.create(LOAN);
        console.log(newLoan);
        res.status(201).json(newLoan);
   }catch(error){
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
      const LOAN = await Loan.findById(carId);
  
      if (LOAN) {
        return res.status(404).json({ error: "loan is not found" });
      }
  
      res.status(200).json(LOAN);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
  //UPDATE A CAR


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