"use strict"

import express from "express"
import { User } from "../models/User"
import { Response, Request } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const Create_User = async (req: Request, res: Response) => {
  console.log(req, "df")
  try {
    const { username, phone, email, password } = req.body as {
      username: string
      phone: string
      email: string
      password: string
    }
    console.log(username, phone, email, password)
    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a new user
    const newUser = new User({
      username,
      phone,
      email,
      password: hashedPassword,
    })
    await newUser.save()

    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

export const User_Login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    // Check if the user exists
    let user: any = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    })
    // to exclude password from response
    // Convert user to plain JavaScriptzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
    user = user.toJSON()
    delete user.password

    res
      .status(200)
      .cookie("testCookie", token, {
        httpOnly: true, // The HttpOnly attribute
        secure: false, // Set to true if using HTTPS
        maxAge: 3600000, // 1 hour expiration
        sameSite: "lax",
      })
      .json({ message: "Login successful" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}
