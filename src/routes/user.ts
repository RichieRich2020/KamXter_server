import express from "express"
import { User } from "../models/User"
import { Response, Request } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Create_User, User_Login } from "../controllers/usercontroller"
import authorizationMiddleware from "../middlewares/authorization"
const router = express.Router()

// Login Register
router.post("/register", Create_User)

// Login Route
router.post("/login", User_Login)

export default router
