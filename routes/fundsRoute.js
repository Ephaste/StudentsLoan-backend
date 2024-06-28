
import express  from "express";
const fundsRouter = express.Router();

import {contribute,getAll,getbyId, getFundsForUser, updateSaving  }from "../controllers/fundsController.js"
import { isAdmin } from "../middleWare/isAdmin.js";
import { verifyToken } from "../middleWare/verifyToken.js";


//usersRouter.use(verifyToken);
fundsRouter.get("/getall", getAll, isAdmin,verifyToken);
fundsRouter.get("/getfundsforuser", getFundsForUser, verifyToken);
fundsRouter.post("/contribute", contribute);
fundsRouter.get("/getById/:id", getbyId);
fundsRouter.put("/updatesaving/:id",updateSaving, verifyToken, isAdmin);

export default fundsRouter;
            