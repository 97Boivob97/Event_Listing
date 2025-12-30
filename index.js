import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./src/config/db.js";

let isConnected = false;

export default async function handler(request, response) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app(request, response);
}
