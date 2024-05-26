import jwt from "jsonwebtoken";
export const generateToken = (data) =>{
    let token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP,
    });
    console.log(token);
    return token;
}