import mongoose, { Document, model, Schema, CallbackError } from "mongoose"

interface IUSER extends Document {
  username: string
  phone: string
  email: string
  password: string
}

const UserSchema: Schema = new Schema<IUSER>(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<IUSER>("user", UserSchema)
