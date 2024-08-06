"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.signOutUser = signOutUser;
const auth_1 = require("firebase/auth");
const auth_2 = require("firebase/auth");
const firebaseService_1 = require("../../services/firebaseService");
const getUserByIdRepository_1 = __importDefault(require("../../repositories/userRepository/getUserByIdRepository"));
async function login(req, res) {
    try {
        const { email, password, } = req.body;
        // Authenticate user with Firebase
        const userCredential = await (0, auth_2.signInWithEmailAndPassword)(firebaseService_1.firebaseAuth, email, password);
        //get authenticated user
        const authenticatedUser = userCredential.user;
        if (authenticatedUser.emailVerified == false) {
            return res.status(422).send({ message: "Your email has not been verified, Please verify your email address to continue" });
        }
        //fetch firestore DB records of authenticated user 
        const userModel = await (0, getUserByIdRepository_1.default)(authenticatedUser.uid);
        // Save authenticated user model in session.
        req.session.user = userModel;
        //return successful response containing authenticated user.
        return res.status(200).json({ message: 'User logged in successfully', user: req.session.user });
    }
    catch (error) {
        //return aunthentication error
        res.status(401).json({ message: 'Authentication failed', error: error });
    }
}
//sign out user
async function signOutUser(req, res) {
    try {
        await (0, auth_1.signOut)(firebaseService_1.firebaseAuth);
        req.session.destroy;
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: 'User logged out successfully', });
    }
    catch (error) {
        return res.status(500).json({ error: 'Oops! Something went wrong. try again', });
    }
}
