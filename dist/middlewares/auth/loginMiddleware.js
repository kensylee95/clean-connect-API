"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const loginMiddleware = [
    //Email validation
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('Email field is required')
        .isEmail().withMessage("Provided email is not valid"),
    //Password validation
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must exceed 6 characters"),
    // Middleware to handle the validation results
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];
exports.default = loginMiddleware;
