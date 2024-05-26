import express from "express";
import { registerUser, loginUser, getAll} from "../controllers/userController.js";
import protect from "../middleWare/authMiddleware.js";

const userRouter = express.Router();
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/getusers",getAll);
// userRouter.get("/logout",logout);
// userRouter.get("/getuser",protect,getUser);
// userRouter.get("/loggedin",loginStatus);
// userRouter.patch("/updateuser",protect,updateUser);
// userRouter.patch("/changepassword",protect,changePassword);
// userRouter.post("/forgotpassword",forgotPassword);


 

export default userRouter;