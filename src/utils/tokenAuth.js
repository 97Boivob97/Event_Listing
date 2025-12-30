import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;
const expireTime = process.env.JWT_EXPIRE_TIME;

const generateToken = (id)=>{
    try{
        const payload = {id};
        return jwt.sign(payload,secretKey,{expiresIn:expireTime});
    }
    catch(error){
        console.error(error);
        return null;
    }
};

export default generateToken;