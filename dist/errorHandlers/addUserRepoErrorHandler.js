"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserRepoErrorHandler = addUserRepoErrorHandler;
const addUserRepositoryErrorMessages_1 = __importDefault(require("../exceptions/userRepositoryErrorMessages/addUserRepositoryErrorMessages"));
function addUserRepoErrorHandler(error) {
    if (error instanceof Error) {
        // Check for Firestore-specific error codes
        const errorCode = error.code;
        return addUserRepositoryErrorMessages_1.default[errorCode] || {
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
