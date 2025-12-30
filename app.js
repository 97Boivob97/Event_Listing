import express from "express";
import router from "./src/routes/api.js";
import rateLimit from "express-rate-limit";
import cors from "cors";
import hpp from "hpp";

const app = express();

const limiter = rateLimit({
    windowMs:15*60*1000,
    max:3000,
    message:"Too many requests"
});

app.use(express.json());
app.use(limiter);
app.use(cors({
  origin: "https://event-listing-fawo.vercel.app",
  credentials: true,
}));
app.use(hpp());

app.use("/api",router);

export default app;

