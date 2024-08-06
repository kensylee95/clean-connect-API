"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const authEmailResponseMiddleware = [
    // Query parameter validation for 'mode'
    (0, express_validator_1.query)('mode')
        .notEmpty().withMessage('Mode is required'),
    // Query parameter validation for 'oobCode'
    (0, express_validator_1.query)('oobCode')
        .notEmpty().withMessage('oobCode is required'),
    // Middleware to handle the validation results
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];
exports.default = authEmailResponseMiddleware;
