import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser"
const app = express();
import authRoutes from "./routes/auth.routes.js";
dotenv.config();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.get("/",(req,res)=>{
   res.send("NexaStream")
})
app.use("/api/v1/auth", authRoutes);
export default app;
