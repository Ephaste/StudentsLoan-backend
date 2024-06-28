import { Contact } from '../models/contactModel.js';
import asyncHandler from 'express-async-handler';
import upload from '../middleware/multer-config.js';
import path from 'path';

// Create Contact
export const createContact = asyncHandler(async (req, res) => {
  upload.single('document')(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err); // Log the error
      return res.status(400).json({ error: 'Failed to upload file', details: err.message });
    }

    const { name, email, message } = req.body;
    const document = req.file ? `/uploads/${req.file.filename}` : '';

    if (!email || !name) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    try {
      const contact = await Contact.create({
        name,
        email,
        message,
        document,
      });

      if (contact) {
        res.status(201).json(contact);
      } else {
        res.status(400).json({ error: 'Invalid contact data' });
      }
    } catch (error) {
      console.error('Contact creation error:', error); // Log the error
      res.status(500).json({ error: 'Internal server error' });
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
