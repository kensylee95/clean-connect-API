const express = require('express');
const router = express.Router();
import registrationController from '../controllers/auth/registrationController';
import {login, signOutUser} from "../controllers/auth/loginController";
import { dashboardIndex } from "../controllers/internalControllers/dashboardController";
import isAuthenticated from "../middlewares/auth/authenticationMiddleware";
import registrationMiddleware from "../middlewares/auth/registrationMiddleware";
import loginMiddleware from "../middlewares/auth/loginMiddleware";
import resetEmailMiddleware from "../middlewares/auth/resetEmailMidleware";
import resetPasswordMiddleware from "../middlewares/auth/resetPasswordMiddleware";
import resetPassword from "../controllers/auth/resetPasswordController";
import sendResetEmail from "../controllers/auth/sendResetEmailController";
import verifyEmail from "../controllers/auth/emailVerificationController";

//check if email already exists
//router.get('get/check/{email}', loginController);
// Authentication routes
//send password registration form request to this end point.
router.post('/post/register/user', registrationMiddleware, registrationController);
//send login form request to this end point.
router.post('/post/login/user', loginMiddleware, login);
//Request reset email via this end point
router.post('/post/send/reset/email', resetEmailMiddleware, sendResetEmail);
//get verification link when user clicks link from email
router.get('/get/verify/email',  verifyEmail);
//confirm verification code and reset password
router.post('/post/reset/password', resetPasswordMiddleware, resetPassword);
//sign out the current authenticated user
router.get('/user/sign-out', isAuthenticated, signOutUser);


//--------------User authorized routes (Only authenticated users have access) -----------------------------------------------------|

//User dashboard
router.get('/get/user/dashboard', isAuthenticated, dashboardIndex);
module.exports = {router};