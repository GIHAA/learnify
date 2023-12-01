import express from "express";
import { getCategories, createCategory, updateCategory, deleteCategory, getOneCategory } from "../../controllers/category.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getOneCategory);
router.post("/create", createCategory);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;