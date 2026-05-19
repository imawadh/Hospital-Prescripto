import logger from "../utils/logger.js";

// 404 handler for unmatched routes.
export const notFound = (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
};

// Central error handler. Catches anything passed to next(err) — including
// body-parser and Multer errors — logs the full error server-side, and
// returns a safe, generic message to the client for 5xx failures in production.
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  logger.error(err);

  let status = err.statusCode || err.status || 500;
  if (err.name === "MulterError") status = 400;
  if (err.message === "Not allowed by CORS") status = 403;

  const message =
    process.env.NODE_ENV === "production" && status >= 500
      ? "Something went wrong. Please try again later."
      : err.message || "Internal server error";

  res.status(status).json({ success: false, message });
};

// Used inside controller catch blocks: logs and responds with a safe message.
export const handleError = (res, error) => {
  logger.error(error);

  const status = error.statusCode || error.status || 500;
  const message =
    process.env.NODE_ENV === "production" && status >= 500
      ? "Something went wrong. Please try again later."
      : error.message || "Internal server error";

  res.status(status).json({ success: false, message });
};
