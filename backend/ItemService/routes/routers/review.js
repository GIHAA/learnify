import express from "express";
import { getReviews, createReview, updateReview, deleteReview, getOneReview, getReviewsByItem, getReviewsByUser } from "../../controllers/review.js";

const router = express.Router();

router.get("/", getReviews);
router.get("/:id", getOneReview);
router.post("/create", createReview);
router.put("/update/:id", updateReview);
router.delete("/delete/:id", deleteReview);
router.get("/item/:id", getReviewsByItem);
router.get("/user/:id", getReviewsByUser);

export default router;
