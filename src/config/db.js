import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const URI = process.env.MONGODB_URI;

const connectDB = async ()=>{
    try{
        await mongoose.connect(URI);
        console.log("Mongoose Connect Successfully!");
    }
    catch(error){
        console.error("MongoDB connection failed!",error);
        process.exit(1);
    }
};

export default connectDB;