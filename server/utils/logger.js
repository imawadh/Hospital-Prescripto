// Minimal leveled logger with timestamps. Keeps log output consistent and
// makes it easy to swap in a transport (file/aggregator) later without
// touching call sites scattered across the codebase.
const timestamp = () => new Date().toISOString();

const logger = {
  info: (...args) => console.log(`[${timestamp()}] [INFO]`, ...args),
  warn: (...args) => console.warn(`[${timestamp()}] [WARN]`, ...args),
  error: (...args) => console.error(`[${timestamp()}] [ERROR]`, ...args),
};

export default logger;
