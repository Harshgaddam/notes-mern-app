import express from "express";
import dotenv from "dotenv";
dotenv.config();
import notes from "./data/notes.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/notes", async (req, res) => {
  res.send(notes);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
