import upload from '../middleWare/uploadMiddleware.js';
import Paid from '../models/paidModel.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  api_key: 916215824597454,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


export const Pay = (req, res) => {
  upload.single('document')(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Document upload failed" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No document uploaded" });
    }

    try {
      // Upload file to Cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'student_loan_documents' // optional, to organize files in folders
      });

      const pay = {
        name: req.body.name, // Ensure the field is 'name'
        amount: req.body.amount,
        document: result.secure_url // Use the URL from Cloudinary
      };
    
      const newPayment = await Paid.create(pay);

      console.log(newPayment);
      res.status(201).json(newPayment);
      console.log("key++++++==", api_key);
      console.log(pay);
      console.log(process.env.CLOUDINARY_API_SECRET);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};

// GETTING PAYMENTS
export const getAll = async (req, res) => {
  try {
    const allPayments = await Paid.find({});
    res.status(200).json(allPayments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
