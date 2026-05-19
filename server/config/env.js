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

// Validates required environment variables before the server boots so the
// process fails fast with a clear message instead of crashing mid-request.
export const validateEnv = () => {
  const missing = REQUIRED.filter((key) => !process.env[key]);
  if (missing.length) {
    logger.error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
    process.exit(1);
  }

  if (process.env.NODE_ENV === "production") {
    const secret = process.env.JWT_SECRET.toLowerCase();
    const looksWeak =
      process.env.JWT_SECRET.length < 32 ||
      ["change_me", "secret", "prescripto"].some((w) => secret.includes(w));
    if (looksWeak) {
      logger.error(
        "JWT_SECRET is too weak for production. Use a long, random string (>= 32 chars)."
      );
      process.exit(1);
    }
    if (process.env.ADMIN_PASSWORD.length < 12) {
      logger.error("ADMIN_PASSWORD is too weak for production (min 12 chars).");
      process.exit(1);
    }
  }
};
