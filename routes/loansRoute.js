
import express  from "express";
const loansRouter = express.Router();

import {applyLoan,getAll, getbyId, updateLoan }from "../controllers/loansController.js"


//usersRouter.use(verifyToken);
loansRouter.get("/getAll", getAll);
loansRouter.post("/apply",applyLoan);
loansRouter.get("/getById/:id", getbyId);
loansRouter.put("/update/:id", updateLoan);

export default loansRouter;
            