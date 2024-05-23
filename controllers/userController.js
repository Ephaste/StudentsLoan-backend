
import asyncHandler from "express-async-handler";
import {User} from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
};


const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    //Validation
    if(!email || !name || !password){
        res.status(400);
        throw new Error("PLease fill in all required fields");
    }
    if(password.length <6){
        res.status(400)
        throw new Error("password must be up to 6 characters");
    }
    //Check if user or email is alredy exist
    const userExist = await User.findOne({email})
    if (userExist){
        res.status(400);
        throw new Error("The email is already used"); 
    } 
   
    //Create a user
    const user = await User.create({
        name,
        email,
        password, 
    });

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
 
    if (user){
        const {_id, name, email,phone,nId, photo, role} =user
        res.status(201).json({
            _id, name, email,phone, photo,nId, role, token, 
        })
    }else{
        res.status(400);
        throw new Error("An invalid user data");
    }
});

//Login User
const loginUser = asyncHandler(async(req, res) => {
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
    throw new Error("User not fiund please signup");  
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
    const {_id, name, email,phone, photo, bio} =user
    res.status(200).json({
        _id, name, email,phone, photo, bio,token
    });

}else{
    res.status(400);
    throw new Error("Invalid email or password  ");   
}
});

//Logout the user
const logout = asyncHandler(async (req, res) =>{
//Send HTTP-only cookie 
res.cookie("token", " ",{
    path: "/", 
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true
   })
  return res.status(200).json({message: "Succesfully logged Out"})
});

//Get user Data
const getUser = asyncHandler(async(req, res)=>{
const user = await User.findById(req.user._id)
if(user){
    const {_id, name, email,phone, nId, photo, role} =user;
    res.status(201).json({
        _id, name, email,phone, nId, photo, bio, role, 
    });
}else{
    res.status(400);
    throw new Error("User not found");    
}

});

//Get Login Status
const loginStatus = asyncHandler(async(req, res) =>{
const token = req.cookies.token;
if(!token){
return res.json (false)
}
// Verify token
const verified = jwt.verify(token, process.env.JWT_SECRET);
if(verified){
    return res.json(true);
}
return res.json(false);
});

// Update user
const updateUser = asyncHandler(async(req, res) => {
 const user = await user.findById(req.user._id)
 if (user){
    const { name, email,phone,nId, photo, role} =user;
    user.email = email,
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.nId = req.body.nId || nId;
    user.role = req.body.role || role;
    user.photo = req.body.photo || photo;

    const updatedUser =await user.user.save()
    res.status(200).json({
  
            _id: updateUser._id,
             name: updateUser.name, 
             email: updateUser.email,
             phone: updateUser.photo, 
             nId: updateUser.nId, 
             photo: updateUser.photo,
             role: updateUser.role
      
     
    })
 }
 else{
    res.status(400);
    throw new Error("User not found");     
 }
});
//Change password
const changePassword = asyncHandler(async(req, res) => {
    const user = await user.findById(req.user._id);
    const {oldPassword, password} = req.body

    if(!user){
        res.status(400);
        throw new Error("User not found please signup"); 
    }
    //Validate
    if(!oldPassword || !password){
        res.status(400);
        throw new Error("Please add old and new password"); 
    }
    //Check if old password matchces password in the DB
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)
//Save new password
if(user && passwordIsCorrect){
    user.password = password
    await user.save()
    res.status(200).send("Password changed successfully")
}else{
    res.status(400);
        throw new Error("Old password is incorrect"); 
}

});

//Forgot password
const forgotPassword = asyncHandler(async(req, res) => {
    res.send("Okey we are testing forgot password");
  
});
 


 
export { registerUser, loginUser,logout,getUser, loginStatus, updateUser, changePassword, forgotPassword };


