"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const registrationMiddleware = [
    //Full name validation
    (0, express_validator_1.body)('fullName')
        .notEmpty().withMessage("Email is required"),
    //Email validation
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('Email field is required')
        .isEmail().withMessage("Provided email is not valid"),
    //Role validation 
    (0, express_validator_1.body)('role')
        .notEmpty().withMessage("User role is required")
        .isIn(['provider', 'admin', 'customer']).withMessage('Role can either be: \'provider\',  \'admin\',  \'customer\''),
    //Phone number validations
    (0, express_validator_1.body)('phoneNumber')
        .notEmpty().withMessage("Phone number is required")
        .matches(/^(\+234|0)[789]\d{9}$/).withMessage("Phone Number must be a valid Nigerian number starting with +234 or 0"),
    //Password validations
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must exceed 6 characters"),
    //Confirm password validation
    (0, express_validator_1.body)('confirmPassword')
        .exists().withMessage('confirm password is required')
        .custom((value, { req }) => value === req.body.password).withMessage("Passwords must match"),
    // Middleware to handle the validatio results
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];
exports.default = registrationMiddleware;
