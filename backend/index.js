//const express = require("express")
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./Routes/auth.route.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT||5000

app.use(cors({origin:'http://localhost:5173',credentials:true}))

app.use(express.json());//allows us to parse incoming request:req.body
app.use(cookieParser())//this will alow us to parse incoming cookies

app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    connectDB();
    console.log("app is running on port 3000")
})

//0z1iiBXvuPSjV8wj

//mongodb+srv://suryanalam1234:0z1iiBXvuPSjV8wj@cluster0.jm0us.mongodb.net/

