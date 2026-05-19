import { v2 as cloudinary } from "cloudinary";
import logger from "../utils/logger.js";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  logger.info("Cloudinary configured");
};

// Streams an in-memory image buffer straight to Cloudinary, so uploaded
// files never touch the server's disk.
const uploadImage = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "prescripto" },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });

export { cloudinary, connectCloudinary, uploadImage };
