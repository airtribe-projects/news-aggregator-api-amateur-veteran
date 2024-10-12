import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

function validateUserRegistrationData(req: Request, res: Response, next: NextFunction) {
    body('email').isEmail().run(req);
    body('password').isLength({ min: 5 }).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, reason: errors.array()[0].msg });
    }
    next();
}

function validateUserLoginData(req: Request, res: Response, next: NextFunction) {
    body('email').isEmail().run(req);
    body('password').isLength({ min: 5 }).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, reason: errors.array()[0].msg });
    }
    next();
}

export {
    validateUserRegistrationData,
    validateUserLoginData,
};
