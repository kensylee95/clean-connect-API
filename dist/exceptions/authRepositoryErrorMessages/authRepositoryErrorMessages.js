"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Define error messages for different Firebase Authentication errors
const AuthRepoErrorMessages = {
    'auth/invalid-email': {
        status: 400,
        message: 'The email address is badly formatted.',
    },
    'auth/user-disabled': {
        status: 403,
        message: 'The user corresponding to the given email has been disabled.',
    },
    'auth/user-not-found': {
        status: 404,
        message: 'There is no user record corresponding to this email.',
    },
    'auth/wrong-password': {
        status: 401,
        message: 'The password is invalid for the given email.',
    },
    'auth/email-already-in-use': {
        status: 400,
        message: 'The email address is already in use by another account.',
    },
    'auth/operation-not-allowed': {
        status: 403,
        message: 'The given sign-in provider is not enabled for this Firebase project.',
    },
    'auth/weak-password': {
        status: 400,
        message: 'The password must be 6 characters long or more.',
    },
    // Add other Firebase Auth error codes and messages as needed
};
exports.default = AuthRepoErrorMessages;
