"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase/auth");
const firebaseService_1 = require("../../services/firebaseService");
const logger = require('../../services/winstonLogger');
async function signUpWithEmailAndPassword({ email, password }) {
    try {
        // Sign in using Firebase Authentication
        const userCredential = await (0, auth_1.createUserWithEmailAndPassword)(firebaseService_1.firebaseAuth, email, password);
        return userCredential;
    }
    catch (error) {
        // Handle Firebase authentication errors
        throw (error);
    }
}
exports.default = signUpWithEmailAndPassword;
