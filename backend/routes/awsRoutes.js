import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import express from "express";
const router = express.Router();

const client = new S3Client({
  region: "ap-south-2",
  credentials: {
    // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: "AKIA6C5RA5SLI7RKPGFP",
    secretAccessKey: "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",
  },
});

async function getObject(key) {
  const command = new GetObjectCommand({
    Bucket: "mern-notes-app-bucket",
    Key: key,
  });
  const url = await getSignedUrl(client, command);
  return url;
}

async function putObject(fileName, contentType) {
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
    Key: key,
  });
  await client.send(command);
  console.log("Deleted");
}

router.get("/getFileURL", async (req, res) => {
  const fileName = req.query.fileName;
  await getObject(fileName);
});

router.put("/putFileURL", async (req, res) => {
  const url = await putObject(`${Date.now()}.jpeg`, "image/jpeg");
  console.log(url);
  res.send(url);
});

router.delete("/deleteFile", async (req, res) => {
  const filePath = req.query.filePath;
  console.log(filePath);
  const response = await deleteObject(filePath);
  res.send(response);
});

export default router;
