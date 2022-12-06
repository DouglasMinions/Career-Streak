const multer = require("multer");
const express = require("express");
const path = require("path");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

const storage_path = path.join(__dirname, "../assets/uploads");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storage_path + req.url.split("?")[0]);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/employer-logo",
  authenticate,
  upload.single("file"),
  (req, res) => {
    const file = req.file;
    res
      .status(200)
      .json({ path: storage_path + req.baseUrl + "/" + file.filename });
  }
);

router.post("/resume", upload.single("file"), (req, res) => {
  const file = req.file;
  res
    .status(200)
    .json({ path: storage_path + req.url.split("?")[0] + "/" + file.filename });
});

module.exports = router;
