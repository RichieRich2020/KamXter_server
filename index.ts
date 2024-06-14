import express from "express"
import dotenv from "dotenv"
import { Response, Request } from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import connectDB from "./src/db/connect.js"
import userRouter from "./src/routes/user.js"
import productRouter from "./src/routes/product.js"
import cartRouter from "./src/routes/cart.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import multer from "multer"
import path from "path"
import { upload } from "./src/middlewares/multer.js"
// Define MongoDB connection

dotenv.config()
connectDB()
// Create Express applicatio
// Configure CORS

const port: any = process.env.PORT || 6000

const app = express()

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // This allows cookies to be sent cross-origin
}

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000") // Your frontend URL
//   res.header("Access-Control-Allow-Credentials", "true")
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   )

//   next()
// })

app.use(cors(corsOptions))
app.use(express.json())

app.use(cookieParser())

//

// Upload API endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }
    console.log(req.file)
    res
      .status(200)
      .json({ message: "File uploaded successfully", file: req.file })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
})

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")))

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
app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})
