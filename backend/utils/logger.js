// backend/utils/logger.js

const winston = require("winston");

// Define log levels and color scheme
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  return env === "production" ? "warn" : "debug";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};

winston.addColors(colors);

// Define format for log messages
const format = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level}: ${message}`;
  })
);

// Define transports for logging
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  new winston.transports.File({ filename: "logs/combined.log" }),
];

// Create the logger instance
const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

// Log helper functions for various log levels
const logInfo = (message) => {
  Logger.info(message);
};

const logWarn = (message) => {
  Logger.warn(message);
};

const logError = (message) => {
  Logger.error(message);
};

const logHttp = (message) => {
  Logger.http(message);
};

const logDebug = (message) => {
  Logger.debug(message);
};

// Export the logger and helper functions
module.exports = {
  logInfo,
  logWarn,
  logError,
  logHttp,
  logDebug,
  Logger,
}; 