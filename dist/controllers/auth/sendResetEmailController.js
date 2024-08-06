"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase/auth");
const firebaseService_1 = require("../../services/firebaseService");
// this method that handles sending reset email to user
async function sendResetEmail(req, res) {
    try {
        //get email from request body
        const { email, } = req.body;
        // Send password reset email
        await (0, auth_1.sendPasswordResetEmail)(firebaseService_1.firebaseAuth, email);
        //return success response after sending email
        res.status(200).json({ message: 'If an account exists for this email address, you will receive a reset email' });
    }
    catch (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).json({ error: 'Error sending password reset email' });
    }
}
;
exports.default = sendResetEmail;
