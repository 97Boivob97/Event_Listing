import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./src/config/db.js";

const port = process.env.PORT || 3000;

const server = async  ()=>{
    try{
        await connectDB();
        app.listen(port,()=> console.log(`The server is running on port number ${port}`));
    }
    catch(error){
        console.error(error);
    }
};

server();