import express from "express"
import { Product } from "../models/Product"
import {
  Get_All_Product,
  Upload_Product,
} from "../controllers/productcontroller"
const router = express.Router()

// POST route to create a new post
router.post("/products", Upload_Product)

router.get("/products", Get_All_Product)

export default router
