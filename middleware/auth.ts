import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interfaces/requests';
import { verifyAuthTokenSignatureAndGetPayload } from '../util/auth_token';

const MIN_PASSWORD_LENGTH = 5;

async function validateUserRegistrationData(req: Request, res: Response, next: NextFunction) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ success: false, reason: 'Email and password are required' });
    }

    await body('email').isEmail().run(req);
    await body('password').isLength({ min: MIN_PASSWORD_LENGTH }).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, reason: errors.array()[0].msg });
    }
    next();
}

async function validateUserLoginData(req: Request, res: Response, next: NextFunction) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ success: false, reason: 'Email and password are required' });
    }

    await body('email').isEmail().run(req);
    await body('password').isLength({ min: MIN_PASSWORD_LENGTH }).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, reason: errors.array()[0].msg });
    }
    next();
}

function authenticateUser(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, reason: 'Unauthorized' });
    }

    try {
        const payload = verifyAuthTokenSignatureAndGetPayload(token);
        const userId = payload.userId;
        if (!userId) {
            return res.status(401).json({ success: false, reason: 'Unauthorized' });
        }

        (req as AuthenticatedRequest).userId = userId;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, reason: 'Unauthorized' });
    }
}

export {
    validateUserRegistrationData,
    validateUserLoginData,
    authenticateUser,
};
