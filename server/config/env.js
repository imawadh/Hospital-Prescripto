import logger from "../utils/logger.js";

const REQUIRED = [
  "MONGODB_URI",
  "JWT_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
];

// Validates that all required environment variables are present before the
// server boots, so the process fails fast with a clear message instead of
// crashing mid-request. Values themselves are not strength-checked — any
// non-empty value is accepted.
export const validateEnv = () => {
  const missing = REQUIRED.filter((key) => !process.env[key]);
  if (missing.length) {
    logger.error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
    process.exit(1);
  }
};
