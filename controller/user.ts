import { Request, Response, NextFunction } from 'express';
import userRepo from '../repo/user';
import { hashPassword, comparePasswords } from '../util/passwords';
import { generateAuthTokenForUser } from '../util/auth_token';
import { tryCatchWrapper } from '../util/try_catch_wrapper';
import { HttpError, httpErrorStatusCodes } from '../interfaces/http_errors';
import { AuthenticatedRequest } from '../interfaces/requests';

async function registerUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    const userModel = {
        email,
        password: hashedPassword,
    };

    await userRepo.createUser(userModel);
    return { success: true };
}

async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userRepo.getUserByEmail(email);
    if (!user) throw new HttpError(httpErrorStatusCodes.NOT_FOUND, 'User not found');

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) throw new HttpError(httpErrorStatusCodes.UNAUTHORIZED, 'Invalid password');

    const token = generateAuthTokenForUser(user.id);
    return { success: true, token };
}

async function getUserPreferences(req: AuthenticatedRequest) {
    const { userId } = req;
    const preferences =  await userRepo.getUserPreferences(userId);
    return { success: true, preferences };
}

async function updateUserPreferences(req: AuthenticatedRequest) {
    const { userId } = req;
    const { preferences } = req.body;

    if (!Array.isArray(preferences) || preferences.some((pref) => typeof pref !== 'string')) {
        throw new HttpError(httpErrorStatusCodes.BAD_REQUEST, 'Invalid preferences');
    }
    const updatedUserPreferences = await userRepo.updateUserPreferences(userId, preferences);
    return { success: true, preferences: updatedUserPreferences  };
}

export default {
    registerUser: tryCatchWrapper(registerUser),
    loginUser: tryCatchWrapper(loginUser),
    getUserPreferences: tryCatchWrapper(getUserPreferences),
    updateUserPreferences: tryCatchWrapper(updateUserPreferences),
}


