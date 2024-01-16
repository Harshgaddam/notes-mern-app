import express from "express";
const router = express.Router();
import {
  getUserById,
  updateUser,
  deleteUser,
  getUserNotes,
  authUser,
  logoutUser,
  registerUser,
  removeNote,
} from "../controllers/userController.js";

router
  .get("/:id", getUserById)
  .get("/:id/notes", getUserNotes)
  .put("/:id", updateUser);
router.delete("/:id", deleteUser);
router
  .post("/login", authUser)
  .post("/register", registerUser)
  .post("/logout", logoutUser)
  .put("/profile", updateUser)
  .post("/removeNote", removeNote);

export default router;
