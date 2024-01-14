import express from "express";
const router = express.Router();
import {
  getUserById,
  updateUser,
  deleteUser,
  getUserNotes,
} from "../controllers/userController.js";

router.get("/:id", getUserById).get("/:id/notes", getUserNotes);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
