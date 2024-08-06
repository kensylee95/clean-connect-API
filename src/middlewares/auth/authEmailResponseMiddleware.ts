import { Request, Response, NextFunction } from 'express';
import { query, validationResult } from 'express-validator';

const authEmailResponseMiddleware = [
    // Query parameter validation for 'mode'
    query('mode')
        .notEmpty().withMessage('Mode is required'),
    
    // Query parameter validation for 'oobCode'
    query('oobCode')
        .notEmpty().withMessage('oobCode is required'),

    // Middleware to handle the validation results
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

export default authEmailResponseMiddleware;
