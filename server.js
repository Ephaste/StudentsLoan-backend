
import  express  from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";
import morgan from "morgan";
import userRouter from "./routes/userRoute.js"
import loansRouter from "./routes/loansRoute.js";
import fundsRouter from "./routes/fundsRoute.js";
//import carRouter from "./src/routes/carRoute.js";
import errorHandler from "./middleWare/errorMiddleware.js";
import cookieParser from 'cookie-parser';



const app =express();
app.use(bodyParser.json());
app.use(cors())
app.use(morgan("dev"))


//app.use('/api/v1/auth', authRouter);
//app.use('/api/v1/car', carRouter);



let port = process.env.PORT || 5000; 
//Middlewares

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());
//error MIddleWAre
app.use(errorHandler);
//Routes Middle ware
app.use("/api/users", userRouter)
app.use("/api/loans", loansRouter)
app.use("/api/funds", fundsRouter)
 //Routes
 app.get("/", (req, res)=>{
 res.send("HOME PAGE");
 });

console.log(process.env.DB_CONNECTION_DEV);
mongoose.connect(process.env.DB_CONNECTION_DEV).then((res) =>{
  console.log("Database connected");
});
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});