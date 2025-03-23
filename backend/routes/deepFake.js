const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const predictImage = require("../controller/deepFake");
const router = express.Router();
const authorize = require('../middleware/authorize');
// Set up storage for uploaded files
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

router.post("/predict-image",authorize, upload.single("image"), predictImage);

module.exports = router;
