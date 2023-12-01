import express from "express";
import { getCarts, createCart, updateCart, deleteCart, getOneCart, getCartsByBuyerID, getCartsByStatus, getCartsByBuyerIDAndNotDelivered, getCartsByBuyerIDAndDelivered } from "../../controllers/cart.js"

const router = express.Router();

router.get("/", getCarts);
router.get("/:id", getOneCart)
router.post("/create", createCart)
router.put("/update/:id", updateCart);
router.delete("/delete/:id", deleteCart);
router.get("/buyer/:id", getCartsByBuyerID);
router.get("/status/:status", getCartsByStatus);
router.get("/buyer/:id/delivered", getCartsByBuyerIDAndDelivered);
router.get("/buyer/:id/notdelivered", getCartsByBuyerIDAndNotDelivered);

export default router;