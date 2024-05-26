
import express  from "express";
const fundsRouter = express.Router();

import {contribute,getAll,getbyId, getFundsForUser  }from "../controllers/fundsController.js"
import { isAdmin } from "../middleWare/isAdmin.js";
import { verifyToken } from "../middleWare/verifyToken.js";


//usersRouter.use(verifyToken);
fundsRouter.get("/getAll", getAll, isAdmin,verifyToken);
fundsRouter.get("/getfundsforuser", getFundsForUser);
fundsRouter.post("/contribute", contribute);
fundsRouter.get("/getById/:id", getbyId);

export default fundsRouter;
            