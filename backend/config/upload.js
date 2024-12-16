const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure 'uploads/' folder exists at the root of your project
  },
  filename: (req, file, cb) => {
    // Set the filename for the uploaded file (add unique timestamp)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject non-image files
  }
};

// Create and export the multer instance with storage and file filter
const upload = multer({ storage, fileFilter });

module.exports = upload;
