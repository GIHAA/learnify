import express from "express";

import { getAllBuyers, getBuyer, createBuyer, updateBuyer, deleteBuyer, authBuyer, verifyBuyer } from "../../controllers/buyer.js";

const router = express.Router();

router.get("/", getAllBuyers);
router.post("/create", createBuyer);
router.put("/update/:id", updateBuyer);
router.delete("/delete/:id", deleteBuyer);
router.post("/login", authBuyer);
router.get("/:id", getBuyer);
router.get("/verify/:id", verifyBuyer);

export default router;