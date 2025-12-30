import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

export const auth = (request,response,next)=>{
    try{
        const token = request.headers.authorization?.split(' ')[1];
        if(!token){
            return response.status(401).json({success:false,message:"No authorized, no token!"});
        }
        const decoded = jwt.verify(token,secretKey);
        request.user = {id:decoded.id};
        next();
    }
    catch(error){
        console.error(error);
        return response.status(401).json({success:false,message:"Invalid Token!"});
    }
}