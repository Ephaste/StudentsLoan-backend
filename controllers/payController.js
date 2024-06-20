import upload from '../middleware/uploadMiddleware.js';
import Paid from '../models/paidModel.js';

export const Pay = async (req, res) => {
  upload.single('document')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Document upload failed" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No document uploaded" });
    }

    try {
      let pay = {
        name: req.body.name,
        amount: req.body.amount,
        document: req.file.path, // Store the file URL from Cloudinary
      };

      let newPayment = await Paid.create(pay);

      console.log(newPayment);
      res.status(201).json(newPayment);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
};


//GETTING PAYMENTS
export const getAll = async (req, res) => {
    try {
      let allPaymets = await Paid.find({});
      res.status(200).json(allPaymets);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };