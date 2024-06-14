import express from "express"
import { Product } from "../models/Product"
import {
  Get_All_Product,
  Upload_Product,
} from "../controllers/productcontroller"
import { upload } from "../middlewares/multer"

const router = express.Router()
// POST route to create a new post

const uploadFields: any = [
  { name: "imageUrl", maxCount: 4 },
  { name: "billimage", maxCount: 1 },
]

router.post("/products", upload.fields(uploadFields), Upload_Product)

router.get("/products", Get_All_Product)

export default router
