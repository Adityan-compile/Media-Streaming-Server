const multer = require("multer");
const {nanoid} = require("nanoid");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve("/var/app/uploads/temp"));
  },
  filename: (req, file, callback) => {
    callback(null, nanoid(5) + Date.now() + path.extname(file.originalname));
  },
});

module.exports = multer({ storage });