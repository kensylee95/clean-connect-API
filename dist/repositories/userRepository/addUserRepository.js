"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase/firestore");
const addUserRepoErrorHandler_1 = require("../../errorHandlers/addUserRepoErrorHandler");
const firebaseService_1 = require("../../services/firebaseService");
async function addUserRepository(user) {
    const collectionName = 'users';
    try {
        const { id, fullName, email, role } = user;
        await (0, firestore_1.setDoc)((0, firestore_1.doc)(firebaseService_1.firestoreDB, collectionName, user.id), {
            id,
            fullName,
            email,
            role,
        });
    }
    catch (error) {
        // Return a readable error response
        if (error instanceof firestore_1.FirestoreError) {
            // Handle the error using the error handler
            const { status, message, } = (0, addUserRepoErrorHandler_1.addUserRepoErrorHandler)(error);
            throw ({ "status": status, message: message });
        }
        else {
            // General error handling
            throw (error);
        }
    }
}
exports.default = addUserRepository;
