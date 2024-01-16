import express from "express";
const router = express.Router();

import {
  getNotes,
  getNoteById,
  saveNote,
  updateNote,
} from "../controllers/noteController.js";

router.get("/", getNotes);
router.get("/:_id", getNoteById);
router.put("/updateNote", updateNote);
router.put("/saveNote", saveNote);

export default router;
