import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
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

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "mern-notes-app-bucket",
    Key: key,
  });
  const url = await getSignedUrl(client, command);
  return url;
}

router.get("/getFileURL", async (req, res) => {
  const fileName = req.query.fileName;
  const url = await getObjectURL(fileName);
  console.log(url);
  res.send(url);
});

export default router;
