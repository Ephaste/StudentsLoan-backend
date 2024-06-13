import {Contact} from "../models/contactModel.js";
import {htmlMessageContact} from "../utils/messageContact.js";
import { sendEmail } from "../utils/appController.js";
   

export const  createContact = async(req, res) =>{
  try{
    let contact = req.body;
    
    let newContact =   await Contact.create(contact);
      
      console.log(newContact);
      console.log("RECIPIENT___-_--",req.body.email);
      console.log("RECIPIENT___-_--",contact.name);
      res.status(201).json(newContact);
      await sendEmail(contact.email,"welcome message","thanks",htmlMessageContact);
  }catch(error){
    res.status(500).json({ error: "Internal server error" });
  }
   

};