import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
const router = express.Router();

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const client = new S3Client({
  region: "ap-south-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function getObject(fileName) {
  const command = new GetObjectCommand({
    Bucket: "mern-notes-app-bucket",
    Key: `uploads/${fileName}`,
  });
  const url = await getSignedUrl(client, command);
  return url;
}

async function putObjectURL(fileName, contentType) {
  const command = new PutObjectCommand({
    Bucket: "mern-notes-app-bucket",
    Key: `uploads/${fileName}`,
    ContentType: contentType,
  });
  const url = await getSignedUrl(client, command);
  return url;
}

async function deleteObject(key) {
  const command = new DeleteObjectCommand({
    Bucket: "mern-notes-app-bucket",
    Key: `uploads/${key}`,
  });
  await client.send(command);
  return "Deleted";
}

router.get("/getFileURL", async (req, res) => {
  const userName = req.query.userName;
  const fileName = req.query.fileName;
  const url = await getObject(`${userName}/${fileName}`);
  res.json({ presignedURL: url });
});

router.put("/putFile", upload.single("file"), async (req, res) => {
  const userName = req.body.userName;
  const fileBuffer = req.file.buffer;
  const fileName = `${userName}/${req.file.originalname}`;
  const contentType = req.file.mimetype;
  const url = await putObjectURL(fileName, contentType);

  await fetch(url, {
    method: "PUT",
    body: fileBuffer,
  });
  res.json({ filePath: fileName.toString() });
});

router.delete("/deleteFile", async (req, res) => {
  const filePath = req.query.filePath;
  await deleteObject(filePath);
  res.json({ message: "Deleted" });
});

export default router;
