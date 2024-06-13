
import express  from "express";
const payRouter = express.Router();
import { Pay} from "../controllers/payController.js";
import { verifyToken } from "../middleWare/verifyToken.js";
import { getAll } from "../controllers/payController.js"


//Making a contact
payRouter.post("/pay", Pay, verifyToken);
payRouter.get("/getall", getAll, verifyToken);
export default payRouter;
            