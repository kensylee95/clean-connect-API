"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase/firestore");
const firebaseService_1 = require("../../services/firebaseService");
async function getUserByIdRepository(id) {
    const collectionName = 'users';
    try {
        const docRef = (0, firestore_1.doc)(firebaseService_1.firestoreDB, collectionName, id);
        const document = await (0, firestore_1.getDoc)(docRef);
        if (!document.exists) {
            throw ("user not found");
        }
        else {
            return document.data();
        }
    }
    catch (error) {
        throw (error);
    }
}
exports.default = getUserByIdRepository;
