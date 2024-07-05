import express from "express";
import pkg from "../middleWare/payment.cjs";
import "dotenv/config";

const { cashin, cashout } = pkg;

const payPackRouter = express.Router();

payPackRouter.post("/cashin", cashin);
payPackRouter.get("/cashout", cashout);

export default payPackRouter;
