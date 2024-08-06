"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardIndex = dashboardIndex;
const getUserByIdRepository_1 = __importDefault(require("../../repositories/userRepository/getUserByIdRepository"));
// dashboard accessible to only authenticated user
async function dashboardIndex(req, res) {
    try {
        //get email from request body
        const id = req.session.user?.id;
        // Send password reset email
        const user = await (0, getUserByIdRepository_1.default)(id);
        //return success response containing fetched user
        res.status(200).json({ message: "request was successful", user: user });
    }
    catch (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).json({ error: error });
    }
}
;
