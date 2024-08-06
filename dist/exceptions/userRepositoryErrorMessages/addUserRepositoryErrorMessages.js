"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Define error messages for different types of errors
const AddUserRepoErrorMessages = {
    'firestore/permission-denied': {
        status: 403,
        message: 'Permission denied: You do not have access to perform this operation.',
    },
    'firestore/invalid-argument': {
        status: 400,
        message: 'Invalid argument: The provided input is not valid.',
    },
    'firestore/aborted': {
        status: 409,
        message: 'Conflict: The operation was aborted due to a conflict with the current state.',
    },
    'firestore/not-found': {
        status: 404,
        message: 'Not found: The requested resource could not be found.',
    },
    // Add other specific error codes and messages as needed
};
exports.default = AddUserRepoErrorMessages;
