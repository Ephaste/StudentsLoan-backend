
import express  from "express";
const fundsRouter = express.Router();

import {contribute,getAll,getbyId, getFundsForUser  }from "../controllers/fundsController.js"
import { isAdmin } from "../middleWare/isAdmin";


//usersRouter.use(verifyToken);
fundsRouter.get("/getAll", getAll, isAdmin);
fundsRouter.get("/getfundsForuser", getFundsForUser);
fundsRouter.post("/contribute", contribute);
fundsRouter.get("/getById/:id", getbyId);

export default fundsRouter;
            