"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const registrationController_1 = __importDefault(require("../controllers/auth/registrationController"));
const loginController_1 = require("../controllers/auth/loginController");
const dashboardController_1 = require("../controllers/internalControllers/dashboardController");
const authenticationMiddleware_1 = __importDefault(require("../middlewares/auth/authenticationMiddleware"));
const registrationMiddleware_1 = __importDefault(require("../middlewares/auth/registrationMiddleware"));
const loginMiddleware_1 = __importDefault(require("../middlewares/auth/loginMiddleware"));
const resetEmailMidleware_1 = __importDefault(require("../middlewares/auth/resetEmailMidleware"));
const resetPasswordMiddleware_1 = __importDefault(require("../middlewares/auth/resetPasswordMiddleware"));
const resetPasswordController_1 = __importDefault(require("../controllers/auth/resetPasswordController"));
const sendResetEmailController_1 = __importDefault(require("../controllers/auth/sendResetEmailController"));
const emailVerificationController_1 = __importDefault(require("../controllers/auth/emailVerificationController"));
//check if email already exists
//router.get('get/check/{email}', loginController);
// Authentication routes
//send password registration form request to this end point.
router.post('/post/register/user', registrationMiddleware_1.default, registrationController_1.default);
//send login form request to this end point.
router.post('/post/login/user', loginMiddleware_1.default, loginController_1.login);
//Request reset email via this end point
router.post('/post/send/reset/email', resetEmailMidleware_1.default, sendResetEmailController_1.default);
//get verification link when user clicks link from email
router.get('/get/verify/email', emailVerificationController_1.default);
//confirm verification code and reset password
router.post('/post/reset/password', resetPasswordMiddleware_1.default, resetPasswordController_1.default);
//sign out the current authenticated user
router.get('/user/sign-out', authenticationMiddleware_1.default, loginController_1.signOutUser);
//--------------User authorized routes (Only authenticated users have access) -----------------------------------------------------|
//User dashboard
router.get('/get/user/dashboard', authenticationMiddleware_1.default, dashboardController_1.dashboardIndex);
module.exports = { router };
