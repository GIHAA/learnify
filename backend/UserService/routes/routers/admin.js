import express from "express";

import { getAllAdmins, getAdmin, createAdmin, updateAdmin, deleteAdmin, authAdmin } from "../../controllers/admin.js";

const router = express.Router();

router.get("/", getAllAdmins);
router.post("/create", createAdmin);
router.put("/update/:id", updateAdmin);
router.delete("/delete/:id", deleteAdmin);
router.post("/login", authAdmin);
router.get("/:id", getAdmin);

export default router;