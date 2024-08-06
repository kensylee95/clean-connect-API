import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const registrationMiddleware = [
    //Full name validation
    body('fullName')
    .notEmpty().withMessage("Email is required"),
    //Email validation
    body('email') 
    .notEmpty().withMessage('Email field is required')
    .isEmail().withMessage("Provided email is not valid"),
    //Role validation 
    body('role')
    .notEmpty().withMessage("User role is required")
    .isIn(['provider', 'admin', 'customer']).withMessage('Role can either be: \'provider\',  \'admin\',  \'customer\''),
    //Phone number validations
    body('phoneNumber')
    .notEmpty().withMessage("Phone number is required")
    .matches(/^(\+234|0)[789]\d{9}$/).withMessage("Phone Number must be a valid Nigerian number starting with +234 or 0"),
    //Password validations
    body('password')
    .notEmpty().withMessage("Password is required")
    .isLength({min:6}).withMessage("Password must exceed 6 characters"),
    //Confirm password validation
    body('confirmPassword')
    .exists().withMessage('confirm password is required')
    .custom((value, {req})=>value === req.body.password).withMessage("Passwords must match"),


     // Middleware to handle the validatio results
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }

];
export default registrationMiddleware;