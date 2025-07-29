import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()


export const generateToken = (userId:string)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET, {expiresIn: "30d"});
   return token;
}