"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authRepositoryErrorHandler_1 = require("../../errorHandlers/authRepositoryErrorHandler");
const firebaseService_1 = require("../../services/firebaseService");
async function signInWithEmailAndPassword({ email, password }) {
    try {
        // Sign in using Firebase Authentication
        const userCredential = await (0, firebaseService_1.signInWithEmailAndPassword)(firebaseService_1.firebaseAuth, email, password);
        // Signed in successfully
        const user = userCredential.user;
        return user;
    }
    catch (error) {
        // Handle Firebase authentication errors
        const { status, message } = (0, authRepositoryErrorHandler_1.authRepoErrorHandler)(error);
        throw ({ "status": status, "message": message });
    }
}
exports.default = signInWithEmailAndPassword;
