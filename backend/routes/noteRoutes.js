import express from "express";
const router = express.Router();

import { getNotes, getNoteById } from "../controllers/noteController.js";

router.get("/", getNotes);
router.get("/:_id", getNoteById);

export default router;
