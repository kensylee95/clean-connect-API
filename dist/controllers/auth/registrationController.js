"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addUserRepository_1 = __importDefault(require("../../repositories/userRepository/addUserRepository"));
const app_1 = require("firebase/app");
const winstonLogger_1 = __importDefault(require("../../services/winstonLogger"));
const auth_1 = require("firebase/auth");
const signUpRepository_1 = __importDefault(require("../../repositories/auth_repository/signUpRepository"));
async function registrationController(req, res) {
    try {
        const currentDate = new Date();
        //Destructure request body to get params
        const { role, password, phoneNumber, email, fullName } = req.body;
        //implements firebase auth sign up method
        const userCredential = await (0, signUpRepository_1.default)({ email: email, password: password });
        //send email verification
        await (0, auth_1.sendEmailVerification)(userCredential.user);
        //Get Signed up user id
        const id = userCredential.user.uid;
        //create user model from signed up user records
        const user = { id: id, role: role, email: email, phoneNumber: phoneNumber, fullName: fullName, createdAt: currentDate };
        //save user details with the signed in UID
        await (0, addUserRepository_1.default)({ ...user });
        //Exclude sensitive fields eg: password etc... from UserModel data to be returned as response to UI
        const { password: userPassword, ...sanitizedData } = user;
        //return succesful response
        return res.status(201).json({ message: "User created successfully", success: true, user: sanitizedData, });
    }
    catch (error) {
        // Return a readable error response
        if (error instanceof app_1.FirebaseError) {
            //log errors
            winstonLogger_1.default.error(error);
            //Some firebase-specific error handling
            switch (error.code) {
                case "auth/network-request-failed":
                    return res.status(500).json({ error: "Request time out. Please ensure you are connected to the internet.", });
                    break;
                case "auth/weak-password":
                    return res.status(500).json({ error: "Password must exceed six characters.", });
                    break;
                case "auth/missing-email":
                    return res.status(500).json({ error: "A valid email is required.", });
                    break;
                case "auth/invalid-email":
                    return res.status(500).json({ error: "The provided email is not valid.", });
                    break;
                case "auth/email-already-exists":
                    return res.status(500).json({ error: "An account already exist with this email address.", });
                    break;
                default:
                    return res.status(500).json({ error: error.message, });
                    break;
            }
        }
        else if (error instanceof Error) {
            //log errors
            winstonLogger_1.default.error(error.message);
            // Return a readable error response for unknown errors
            return res.status(500).json({ error: error.message, stack: error.stack });
        }
        else {
            return res.status(500).json({ error: error });
        }
    }
}
exports.default = registrationController;
