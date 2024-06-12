import express from "express"
import { Response, Request } from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import connectDB from "./db/connect.js"
import userRouter from "./src/routes/user.js"
import productRouter from "./src/routes/product.js"
import cartRouter from "./src/routes/cart.js"
import cookieParser from "cookie-parser"
import cors from "cors"
// Define MongoDB connection

connectDB()

// Create Express application
// Configure CORS
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend's URL
  credentials: true, // This allows the browser to include credentials (cookies) in requests
}

const app = express()
app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use("/api/user", userRouter)
app.use("/api/create", productRouter)
app.use("/api/buy", cartRouter)
app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    working: "poooooonnnnng",
  })
})

// Start Express server
app.listen(5000, () => {
  console.log("Server is running at port 5000")
})
