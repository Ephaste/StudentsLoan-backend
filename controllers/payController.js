import upload from '../middleWare/uploadMiddleware.js';
import Paid from '../models/paidModel.js';

// Create Payment
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
      const pay = {
        name: req.body.name,
        amount: req.body.amount,
        document: `/uploads/${req.file.filename}` // Use the local file path
      };

      const newPayment = await Paid.create(pay);
      res.status(201).json({ message: "Payment recorded and is under review", newPayment });
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
