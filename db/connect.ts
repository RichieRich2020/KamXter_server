import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mydata", {
      // Recommended to avoid deprecated functions
    })
    console.log("Database connected")
  } catch (error) {
    console.error("Error connecting to database:", error)
  }
}
export default connectDB
