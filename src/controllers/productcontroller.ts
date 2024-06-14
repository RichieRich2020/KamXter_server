import express from "express"
import { Product } from "../models/Product"
import { Response, Request } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const Upload_Product = async (req: Request, res: Response) => {
  const {
    title,
    content,
    seller,
    price,
    address,
    usage,
    brand,
    original_price,
  } = req.body

  try {
    console.log(req.files)
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined

    // Use optional chaining to handle potential undefined values
    const imageUrls = files?.["imageUrl"]?.map((file) => file.filename) || []
    const billImageUrl = files?.["billimage"]?.[0]?.filename || ""

    if (!billImageUrl || imageUrls.length === 0) {
      return res
        .status(400)
        .json({ message: "Both imageUrl and billimage are required" })
    }

    // Create a new product with the extracted file paths
    const product = await Product.create({
      title,
      content,
      seller,
      price,
      address,
      usage,
      brand,
      original_price,
      imageUrl: imageUrls, // Save imageUrls as an array
      billimage: billImageUrl, // Save billimage as a string
    })

    // Respond with the saved post
    res.status(201).json({ message: "product uploaded successfully" })
  } catch (error) {
    // If there's an error, respond with an error message
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message })
  }
}

export const Get_All_Product = async (req: Request, res: Response) => {
  try {
    // Fetch all products from the database
    const products = await Product.find().populate({
      path: "seller",
      select: "username phone email _id",
    })

    // Respond with the list of products
    res.status(200).json(products)
  } catch (error) {
    // If there's an error, respond with an error message
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message })
  }
}
