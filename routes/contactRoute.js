
import express  from "express";
import { createContact } from "../controllers/contactController.js";
const contactRouter = express.Router();


//Making a contact
contactRouter.post("/makecontact", createContact);
export default contactRouter;
            