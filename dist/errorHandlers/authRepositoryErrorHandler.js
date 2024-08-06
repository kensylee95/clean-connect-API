"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRepoErrorHandler = authRepoErrorHandler;
const authRepositoryErrorMessages_1 = __importDefault(require("../exceptions/authRepositoryErrorMessages/authRepositoryErrorMessages"));
function authRepoErrorHandler(error) {
    if (error instanceof Error) {
        // Check for Firebase Authentication error codes
        const errorCode = error.code;
        return authRepositoryErrorMessages_1.default[errorCode] || {
            status: 500,
            message: `An unexpected error occurred: ${error.message}`,
        };
    }
    else {
        return {
            status: 500,
            message: 'An unexpected error occurred.',
        };
    }
}
