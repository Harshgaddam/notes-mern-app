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

async function getObject(fileName, contentType) {
  const command = new GetObjectCommand({
    Bucket: "mern-notes-app-bucket",
    Key: `uploads/${fileName}`,
    ResponseContentType: contentType,
    ResponseContentDisposition: "inline",
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

const getContentType = (fileName) => {
  const fileExtension = fileName.split(".").pop().toLowerCase();

  const contentTypeMap = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    pdf: "application/pdf",
    bmp: "image/bmp",
    csv: "text/csv",
    odt: "application/vnd.oasis.opendocument.text",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    gif: "image/gif",
    htm: "text/htm",
    html: "text/html",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    tiff: "image/tiff",
    txt: "text/plain",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    mp4: "video/mp4",
  };

  return contentTypeMap[fileExtension] || "application/octet-stream";
};

router.get("/getFileURL", async (req, res) => {
  const userName = req.query.userName;
  const fileName = req.query.fileName;
  const contentType = getContentType(fileName);
  const url = await getObject(`${userName}/${fileName}`, contentType);
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
