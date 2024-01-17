import express from "express";
const router = express.Router();

import {
  getNotes,
  getNoteById,
  createNote,
  saveNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

router.get("/", getNotes);
router.get("/:_id", getNoteById);
router.put("/createNote", createNote);
router.put("/updateNote", updateNote);
router.put("/saveNote", saveNote);
router.delete("/:_id", deleteNote);

export default router;
