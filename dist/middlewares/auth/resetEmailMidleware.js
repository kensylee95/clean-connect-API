"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const resetEmailMiddleware = [
    //Email validation
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('Email field is required')
        .isEmail().withMessage("Provided email is not valid"),
    // Middleware to handle the validation results
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];
exports.default = resetEmailMiddleware;
