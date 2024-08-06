"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
// Determine the log file path
const fileName = path_1.default.join(__dirname, '../app.log');
// Define the log format
const logFormat = winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`));
// Create a logger instance
const logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console({ format: logFormat }), // Log to console
        new winston_1.transports.File({ filename: fileName, format: logFormat }) // Log to file
    ]
});
exports.default = logger;
