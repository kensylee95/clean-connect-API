"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Authentication middleware to ensure user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        //User is authenticated
        return next();
    }
    //user is not authenticated 
    return res.sendStatus(401);
}
exports.default = isAuthenticated;
