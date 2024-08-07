import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import morgan from "morgan";
import userRouter from "./routes/userRoute.js";
import loansRouter from "./routes/loansRoute.js";
import fundsRouter from "./routes/fundsRoute.js";
import errorHandler from "./middleWare/errorMiddleware.js";
import cookieParser from 'cookie-parser';
import contactRouter from "./routes/contactRoute.js";
import payRouter from "./routes/paidRoute.js";
import { __dirname } from "./dirname.js"; // Import the helper function
import path from "path";
import payPackRouter from "./routes/paypack.js";
// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname(import.meta.url), 'uploads')));

// Routes Middleware
app.use("/api/users", userRouter);
app.use("/api/loans", loansRouter);
app.use("/api/funds", fundsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/payment", payRouter);
app.use("/api/paypack", payPackRouter);

// Root Route
app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

// Error Middleware
app.use(errorHandler);

// Connect to MongoDB and start the server
const port = process.env.PORT || 5000;
const dbConnection = process.env.DB_CONNECTION_DEV;

mongoose.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
