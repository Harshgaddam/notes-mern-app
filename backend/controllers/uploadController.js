import path from "path";
import express from "express";
import multer, { memoryStorage } from "multer";

const router = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, path.join(__dirname, "uploads/"));
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

const storage = memoryStorage();

const upload = multer({ storage });

const checkStatus = (req, res) => {
  res.send("Upload route");
};

const uploadImage = (req, res) => {
  console.log("Body", req.body);
  res.json({ message: "Upload route", name: "Hello" });
};

// router.post("/", upload.single("upfile"), async (req, res, err) => {
//   console.log("Body", req.body);
//   if (err) {
//     return res.status(400).send({ message: err.message });
//   }
//   try {
//     res.status(200).send({
//       message: "File uploaded successfully",
//       image: `/${req.file.path}`,
//     });
//   } catch (error) {
//     res.status(400).send({ message: error.message });
//   }
// });

export { checkStatus, uploadImage };
