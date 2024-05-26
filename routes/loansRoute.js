
import express  from "express";
const loansRouter = express.Router();

import {applyLoan,getAll, getbyId, updateLoan, getLoansForUser}from "../controllers/loansController.js"
import { isAdmin } from "../middleWare/isAdmin.js";
import protect from "../middleWare/authMiddleware.js";
import { verifyToken } from "../middleWare/verifyToken.js";


//usersRouter.use(verifyToken);
loansRouter.get("/getAll", getAll, verifyToken,isAdmin);
loansRouter.get("/getById/:id", getbyId, verifyToken,isAdmin);
loansRouter.get("/getloansforuser", getLoansForUser, verifyToken);
loansRouter.post("/apply",applyLoan, verifyToken);
loansRouter.put("/update/:id", updateLoan, isAdmin);


export default loansRouter;
            