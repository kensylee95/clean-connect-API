"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = exports.AppSecretKey = exports.applicationRootUrl = exports.applicationPort = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from a .env file
dotenv_1.default.config();
// Extract environment variables
const { API_KEY, AUTH_DOMAIN, Project_ID, STORAGE_BUCKET, MESSAGE_SENDERID, APPID, PORT, ROOTURL, APPSECRETKEY, } = process.env;
// Define the application's configuration
exports.applicationPort = Number(PORT);
exports.applicationRootUrl = ROOTURL || "localhost:3000";
exports.AppSecretKey = APPSECRETKEY || "";
exports.firebaseConfig = {
    apiKey: API_KEY || '',
    authDomain: AUTH_DOMAIN || '',
    projectId: Project_ID || '',
    storageBucket: STORAGE_BUCKET || '',
    messagingSenderId: MESSAGE_SENDERID || '',
    appId: APPID || '',
};
