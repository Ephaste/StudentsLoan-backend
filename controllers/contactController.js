import { Contact } from '../models/contactModel.js';
import asyncHandler from 'express-async-handler';
import upload from '../middleware/multer-config.js';

// Create Contact
export const createContact = asyncHandler(async (req, res) => {
  upload.single('document')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Failed to upload file' });
    }

    const { name, email, message } = req.body;
    const document = req.file?.path;

    if (!email || !name) {
      res.status(400);
      throw new Error('Please fill in all required fields');
    }

    const contact = await Contact.create({
      name,
      email,
      message,
      document,
    });

    if (contact) {
      res.status(201).json(contact);
    } else {
      res.status(400);
      throw new Error('Invalid contact data');
    }
  });
});

// Get All Contacts
export const getAll = asyncHandler(async (req, res) => {
  try {
    const allContacts = await Contact.find({});
    res.status(200).json(allContacts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
