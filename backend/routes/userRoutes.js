import express from "express";
const router = express.Router();
import {
  getUserById,
  updateUser,
  deleteUser,
  getUserNotes,
  authUser,
} from "../controllers/userController.js";

router.get("/:id", getUserById).get("/:id/notes", getUserNotes);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", authUser);

export default router;
