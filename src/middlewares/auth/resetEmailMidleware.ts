import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const resetEmailMiddleware = [
    //Email validation
    body('email') 
    .notEmpty().withMessage('Email field is required')
    .isEmail().withMessage("Provided email is not valid"),

     // Middleware to handle the validation results
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }

];
export default resetEmailMiddleware;