"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEmailVerification = handleEmailVerification;
const auth_1 = require("firebase/auth");
const urlLinks_1 = require("../constants/urlLinks");
async function handleEmailVerification(response, auth, oobCode) {
    try {
        //url to redirect to front end route with the "verified" as query params
        const url = `${urlLinks_1.loginRedirectUrl}?verified=true`;
        await (0, auth_1.applyActionCode)(auth, oobCode);
        //redirect to route
        response.redirect(302, url);
    }
    catch (error) {
        throw response.status(400).json({ error: 'invalid or expired verification code, please request code again' });
    }
}
