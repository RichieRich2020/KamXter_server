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
    imageUrl,
    address,
    billimage,
    usage,
    brand,
    original_price,
  } = req.body

  try {
    // Create a new post with user ID
    const newPost = new Product({
      title,
      content,
      seller,
      price,
      imageUrl,
      address,
      billimage,
      usage,
      brand,
      original_price,
    })

    // Save the new post to the database
    const savedPost = await newPost.save()

    // Respond with the saved post
    res
      .status(201)
      .json({ message: "product uploaded successfully", savedPost })
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
