import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./src/config/db.js";

const server = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};

server();

export default app; 
