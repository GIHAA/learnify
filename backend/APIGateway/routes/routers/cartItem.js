import express from "express";
import { getCartItems, getOneCartItem, createCartItem, updateCartItem, deleteCartItem, getCartItemsByCartID , getRecentOrdersByBrand } from "../../controllers/cartItem.js"

const router = express.Router();

router.get("/", getCartItems);
router.get("/:id", getOneCartItem)
router.post("/create", createCartItem)
router.put("/update/:id", updateCartItem);
router.delete("/delete/:id", deleteCartItem);
router.get("/cart/:id", getCartItemsByCartID);
router.get("/recentorders/:brand", getRecentOrdersByBrand);

export default router;