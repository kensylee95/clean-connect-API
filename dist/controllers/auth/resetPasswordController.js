"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseService_1 = require("../../services/firebaseService");
const auth_1 = require("firebase/auth");
//3. method that handles sending reset email to user
async function resetPassword(req, res) {
    try {
        //get newpassword & confirmation code from request body
        const { confirmationCode, newPassword } = req.body;
        // Confirm and reset password
        await (0, auth_1.confirmPasswordReset)(firebaseService_1.firebaseAuth, confirmationCode, newPassword);
        //return success response after resetting password
        res.status(200).json({ message: 'Your password reset was successful' });
    }
    catch (error) {
        console.error('Error occured:', error);
        res.status(500).json({ error: 'Could not reset email' });
    }
}
;
exports.default = resetPassword;
