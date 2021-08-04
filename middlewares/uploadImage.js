const multer = require("multer");
const imageValidator = require("../utils/imageValidation");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "public/images/logos/";
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-logo-" + fileName);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  fileFilter: imageValidator,
});

module.exports = upload;
