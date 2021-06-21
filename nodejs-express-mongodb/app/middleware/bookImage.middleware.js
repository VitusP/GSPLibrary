const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const util = require("util");
let path = require("path");

// Image processing
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter }).single('photo');
var uploadFileMiddleware = util.promisify(upload);
module.exports = uploadFileMiddleware;
