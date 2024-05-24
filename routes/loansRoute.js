
import express  from "express";
const loansRouter = express.Router();

import {applyLoan,getAll, getbyId, updateLoan, getLoansForUser}from "../controllers/loansController.js"
import { isAdmin } from "../middleWare/isAdmin";
import protect from "../middleWare/authMiddleware.js";


//usersRouter.use(verifyToken);
loansRouter.get("/getAll", getAll, isAdmin);
loansRouter.get("/getById/:id", getbyId);
loansRouter.put("/getloansforuser/:id", getLoansForUser);
loansRouter.post("/apply",applyLoan, protect);
loansRouter.put("/update/:id", updateLoan, isAdmin);


export default loansRouter;
            