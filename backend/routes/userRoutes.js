import express from "express";
const router = express.Router();
import {
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
