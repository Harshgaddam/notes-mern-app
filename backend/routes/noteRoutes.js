import express from "express";
const router = express.Router();

import {
  getNotes,
  getNoteById,
  saveNote,
} from "../controllers/noteController.js";

router.get("/", getNotes);
router.get("/:_id", getNoteById);
router.post("/saveNote", saveNote);

export default router;
