import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import "dotenv/config";

import { validateEnv } from "./config/env.js";
import connectdb from "./config/mongodb.js";
import { connectCloudinary } from "./config/cloudinary.js";
import logger from "./utils/logger.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// Fail fast if the environment is misconfigured.
validateEnv();

// App config
const app = express();
const PORT = process.env.PORT || 4000;

// Trust the first proxy hop so client IPs (and rate limiting) work behind a
// load balancer / reverse proxy in production.
app.set("trust proxy", 1);

// Security headers. Allow images served from /images to be embedded by the
// separately-hosted frontends (cross-origin <img> loads).
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS — restrict to configured origins. With no CORS_ORIGINS set, all
// origins are allowed (intended for local development only).
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (no Origin header) and configured origins.
      if (
        !origin ||
        allowedOrigins.length === 0 ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Body parsing with sane size limits
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Request logging
app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev", {
    stream: { write: (msg) => logger.info(msg.trim()) },
  })
);

// Global rate limiter for the API surface
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});
app.use("/api", apiLimiter);

// Stricter limiter for auth endpoints to slow down brute-force attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts, please try again later.",
  },
});
app.use(
  [
    "/api/admin/login",
    "/api/doctor/login",
    "/api/user/login",
    "/api/user/register",
  ],
  authLimiter
);

// Serve static doctor images
app.use("/images", express.static("uploads/doctors"));

// Health check (for load balancers / uptime monitors)
app.get("/health", (req, res) => {
  res.json({ success: true, status: "ok", uptime: process.uptime() });
});

app.get("/", (req, res) => {
  res.json({ success: true, message: "Prescripto API is running" });
});

// API endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// 404 + central error handling (must be registered last)
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectdb();
    await connectCloudinary();

    const server = app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
    });

    // Graceful shutdown so in-flight requests can finish on deploy/restart.
    const shutdown = (signal) => {
      logger.info(`${signal} received, shutting down gracefully...`);
      server.close(() => {
        logger.info("HTTP server closed");
        process.exit(0);
      });
      // Force-exit if connections do not drain within the grace period.
      setTimeout(() => {
        logger.error("Could not close connections in time, forcing exit");
        process.exit(1);
      }, 10000).unref();
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Last-resort safety nets so an unexpected failure is logged, not swallowed.
process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled promise rejection:", reason);
});
process.on("uncaughtException", (error) => {
  logger.error("Uncaught exception:", error);
  process.exit(1);
});

startServer();
