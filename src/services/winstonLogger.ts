import { createLogger, format, transports, Logger } from 'winston';
import path from 'path';

// Determine the log file path
const fileName = path.join(__dirname, '../app.log');

// Define the log format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Create a logger instance
const logger: Logger = createLogger({
  transports: [
    new transports.Console({ format: logFormat }), // Log to console
    new transports.File({ filename: fileName, format: logFormat }) // Log to file
  ]
});

export default logger;
