import path from "path";
import express from "express";
import multer from "multer";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../../frontend/public/uploads"));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });
const uploadSingleImage = upload.single("file");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    console.log(req.file);
    if (err) {
      res.status(400).send({ message: err.message });
    }

    try {
      res.json({
        filePath: `/${req.file.path}`,
      });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });
});

export default router;
