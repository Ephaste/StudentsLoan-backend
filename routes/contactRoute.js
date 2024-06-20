
import express  from "express";
import { createContact, getAll } from "../controllers/contactController.js";
const contactRouter = express.Router();


//Making a contact
contactRouter.post("/makecontact", createContact);
contactRouter.get("/getall", getAll);
export default contactRouter;
            