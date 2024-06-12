import express from "express"
import { User } from "../models/User"
import { Cart } from "../models/Cart"
import { Response, Request } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const Add_To_Cart = async (req: Request, res: Response) => {
  const { products, buyer, quantity } = req.body

  try {
    // Create a new post with user ID
    const newPost = new Cart({
      products,
      buyer,
      quantity,
    })

    // Save the new post to the database
    const savedPost = await newPost.save()

    // Respond with the saved post
    res.status(201).json({ message: "product buyed successfully", savedPost })
  } catch (error) {
    // If there's an error, respond with an error message
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message })
  }
}

export const Get_All_Cart_Product = async (req: Request, res: Response) => {
  try {
    // Fetch all products from the database
    const carts = await Cart.find().populate(["products", "buyer"])

    // Respond with the list of products
    res.status(200).json(carts)
  } catch (error) {
    // If there's an error, respond with an error message
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message })
  }
}

export const Get_Product_By_id = async (req: Request, res: Response) => {
  const userId = req.params.id

  try {
    // Find all carts for the given user ID
    console.log(userId)
    const carts = await Cart.find({ buyer: userId })
    console.log(carts)
    if (carts.length === 0) {
      return res.status(404).json({ message: "No carts found for this user" })
    }

    // Respond with the cart items
    res.status(200).json(carts)
  } catch (error) {
    // If there's an error, respond with an error message
    res
      .status(500)
      .json({ message: "Failed to fetch cart items", error: error.message })
  }
}

export const Upadte_Cart_Product_BY_ID = async (
  req: Request,
  res: Response
) => {
  const cartId = req.params.id
  const { status } = req.body

  // Check if the status provided is valid
  const validStatuses = ["pending", "completed", "canceled"]
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" })
  }

  try {
    // Find the cart by ID and update the status
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { status },
      { new: true, runValidators: true }
    )

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    // Respond with the updated cart
    res.status(200).json(updatedCart)
  } catch (error) {
    // If there's an error, respond with an error message
    res
      .status(500)
      .json({ message: "Failed to update cart status", error: error.message })
  }
}
