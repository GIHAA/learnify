import express from "express";

import { getAllSellers, getSeller, createSeller, updateSeller, deleteSeller, authSeller, verifySeller } from "../../controllers/seller.js";

const router = express.Router();

router.get("/", getAllSellers);
router.post("/create", createSeller);
router.put("/update/:id", updateSeller);
router.delete("/delete/:id", deleteSeller);
router.post("/login", authSeller);
router.get("/:id", getSeller);
router.get("/verifySeller/:id", verifySeller);

export default router;