import express from "express";
const router = express.Router();
import { getUserById, updateUser } from "../controllers/userController.js";

router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
