import express from "express";
import { getDeliveries, createDelivery, updateDelivery, deleteDelivery, getOneDelivery } from "../../controllers/delivery.js"

const router = express.Router();

router.get("/", getDeliveries);
router.get("/:id", getOneDelivery)
router.post("/create", createDelivery)
router.put("/update/:id", updateDelivery);
router.delete("/delete/:id", deleteDelivery);

export default router;