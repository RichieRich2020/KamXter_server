import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const mongodb_url: any = process.env.MONGODB_URI
console.log(mongodb_url)
const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_url, {
      // Recommended to avoid deprecated functions
    })
    console.log("Database connected")
  } catch (error) {
    console.error("Error connecting to database:", error)
  }
}
export default connectDB
