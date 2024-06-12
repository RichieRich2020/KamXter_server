import mongoose, { Document, model, Schema } from "mongoose"

interface IProduct extends Document {
  title: string
  content: string
  imageUrl: string
  price: Number
  seller: mongoose.Types.ObjectId
  address: string
  usage: string
  billimage: string
  original_price: Number
  brand: string
}

const ProductSchema: Schema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  usage: {
    type: String,
    required: true,
  },
  billimage: {
    type: String,
    required: true,
  },
  original_price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
})

export const Product = model<IProduct>("product", ProductSchema)
