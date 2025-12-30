import User from "../models/userModel.js";
import generateToken from "../utils/tokenAuth.js";

export const registration = async (request,response)=>{
    try{
        const {name,email,password} = request.body;
        if(!name || !email || !password){
            return response.status(400).json({success:false,message:"All fields are required!"});
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return response.status(409).json({success:false,message:"Email Already Exists!"});
        }
        const user = await  User.create({name,email,password});
        const { password:_,...safeUser} =user.toObject();

        response.status(201).json({
            success:true,
            message:"User Registered Successfully!",
            user:safeUser
        });
    }
    catch(error){
        console.error(error);
        return response.status(500).json({success:false,message:"Registration Failed!"});
    }
};

export const login = async (request,response)=>{
    try{

        const {email,password} = request.body;
        if(!email || !password){
            return response.status(400).json({success:false,message:"All fields are required!"});
        }
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return response.status(401).json({success:false,message:"Email or Password does not match, Invalid Credentials!"});
        }
        const isMatched = await user.isMatched(password);
        if(!isMatched){
            return response.status(401).json({success:false,message:"Email or Password does not match, Invalid Credentials!"});
        }
        const token = generateToken(user._id);
        response.cookie("userToken", token, {
            httpOnly: true, 
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        const { password: _, ...safeUser } = user.toObject();
        response.status(200).json({
            success:true,
            message:"Logged in successfully!",
            user:safeUser,
            token
        });

    }
    catch(error){
        console.error(error);
        return response.status(500).json({success:false,message:"Login Failed!"});
    }
};