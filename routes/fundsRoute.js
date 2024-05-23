
import express  from "express";
const fundsRouter = express.Router();

import {contribute,getAll,  }from "../controllers/fundsController.js"


//usersRouter.use(verifyToken);
//fundsRouter.get("/getAll", getAll);
fundsRouter.post("/contribute", contribute);
//fundsRouter.get("/getById/:id", getbyId);

export default fundsRouter;
            