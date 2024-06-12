import express from "express"
import { Cart } from "../models/Cart"
import {
  Add_To_Cart,
  Get_All_Cart_Product,
  Get_Product_By_id,
  Upadte_Cart_Product_BY_ID,
} from "../controllers/cartcontrolller"
import authorizationMiddleware from "../middlewares/authorization"
const router = express.Router()

router.post("/cart", Add_To_Cart)

router.get("/cart", authorizationMiddleware, Get_All_Cart_Product)

router.get("/cart/:id", Get_Product_By_id)

router.patch("/cart/:id", Upadte_Cart_Product_BY_ID)
export default router
