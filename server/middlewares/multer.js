import multer from "multer";

// Keep uploads in memory: they are streamed straight to Cloudinary, so no
// temp files are written to disk (avoids disk-fill and path-traversal risks).
const storage = multer.memoryStorage();

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 }, // 5 MB
  fileFilter: (req, file, callback) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      return callback(null, true);
    }
    const error = new Error("Only JPEG, PNG, and WebP images are allowed");
    error.statusCode = 400;
    callback(error);
  },
});

export default upload;
