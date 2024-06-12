import mongoose, { Document, model, Schema } from "mongoose"

interface ICart extends Document {
  products: mongoose.Types.ObjectId
  buyer: mongoose.Types.ObjectId
  quantity: number
  status: "pending" | "completed" | "cancelled" // Enum for status
}

const CartSchema: Schema = new Schema<ICart>({
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
    required: true,
  },
})

export const Cart = model<ICart>("cart", CartSchema)
