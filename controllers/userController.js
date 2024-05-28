//import { generateToken,hashPassword } from "../../utils/passwordFunction.js";
import { comparePassword, hashPassword} from "../utils/passwordFunction.js";
import { generateToken } from "../utils/jwtFunction.js";
import { User } from "../models/userModel.js";

import { sendEmail } from "../utils/appController.js";
import { htmlMessage } from "../utils/message.js";
export const registerUser = async(req, res) =>{
    

    try{
        let hashedPassword = await hashPassword(req.body.password);
        req.body.password =hashedPassword;
        let newUser = await User.create(req.body);
        console.log("newuser.email",newUser.email)
await sendEmail(newUser.email,"welcome message","thanks",htmlMessage)

     
     let token =  generateToken({
        _id: newUser._id,
        email: newUser.email,
         });
         res.status(201).json({
            message: "User registered sucessfully",
            access_token:token,
            user:{
                email : newUser.email,
                name: newUser.name,
                phone: newUser.phone,
                 role: newUser.role,
            },
         });
     
 
     
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "internal server error! User is already registered",
       });
    }
    
};
//LOGIN



//Login User
export  const loginUser = async(req, res) => {
 const {email, password} = req.body
//Validate request

if(!email || !password){
    res.status(400);
    throw new Error("PLease add an email and password");  
}
//Check if a user exist
const user = await User.findOne({email})
if(!user){
    res.status(400);
    throw new Error("User not found please signup");  
}
//User exist, mow lets check if passwoed is correct
const passwordIsCorrect = await bcrypt.compare(password, user.password)

 //Generate Token
 const token = generateToken(user._id)
 //Send HTTP-only cookie 
 res.cookie("token", token,{
  path: "/", 
  httpOnly: true,
  expires: new Date(Date.now()+ 1000 * 86400),//1 Day
  sameSite: "none",
  secure: true
 })

 
if(user && passwordIsCorrect){
    const {_id, name, email,phone, photo, role} =user
    res.status(200).json({
      messgage: "Login sucssfull",
        _id, name, email,phone, photo, role,token
    });

}else{
    res.status(400);
    throw new Error("Invalid email or password  ");   
}
};
// export const loginUser = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found!",
//       });
//     }

//     let isPasswordCorrect = await comparePassword(req.body.password, user.password);
    

//     // if (!isPasswordCorrect) {
//     //   return res.status(401).json({
//     //     message: "Wrong password----------->",
//     //   });
//     // }
//     if (isPasswordCorrect){

//     // If the user is authenticated, generate a token and send a success response
//     let token = generateToken({
//       _id: user._id, // Use the correct user's ID
//       email: user.email,
//     });

//     res.status(200).json({
//       message: "Login is successful!",
//       access_token: token,
//       user: {
//         email: user.email,
//         name: user.name,
//         phone: user.phone,
//         role: user.role,
//       },
//     });
//   }
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal server error!",
     
//     });
//     console.log(error);
//   }
// };
//Getting users
export const getAll = async (req, res) => {
  try {
    let allusers = await User.find({});
    res.status(200).json(allusers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};