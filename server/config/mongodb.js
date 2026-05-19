import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectdb = async () => {
  mongoose.connection.on("connected", () => logger.info("MongoDB connected"));
  mongoose.connection.on("error", (err) =>
    logger.error("MongoDB connection error:", err.message)
  );
  mongoose.connection.on("disconnected", () =>
    logger.warn("MongoDB disconnected")
  );

  // Strip any trailing slash so the db name is appended cleanly.
  const uri = process.env.MONGODB_URI.replace(/\/+$/, "");
  const dbName = process.env.MONGODB_DB || "prescripto";

  await mongoose.connect(`${uri}/${dbName}`, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
  });
};

export default connectdb;
