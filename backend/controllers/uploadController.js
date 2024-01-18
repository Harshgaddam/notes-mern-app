import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

const checkStatus = (req, res) => {
  res.send("Upload route");
};

const uploadImage = (req, res) => {
  upload.single("file")(req, res, (err) => {
    console.log(req.body);
    res.json({
      filePath: `/${req.file.path}`,
    });
  });
};

export { checkStatus, uploadImage };
