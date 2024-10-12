import express from 'express';
import userController from '../controller/user';
import { validateUserRegistrationData, validateUserLoginData, authenticateUser } from '../middleware/auth';

const router = express.Router();

router.post('/signup', validateUserRegistrationData, userController.registerUser);
router.post('/login', validateUserLoginData, userController.loginUser);

router.get('/preferences', authenticateUser, userController.getUserPreferences);
router.put('/preferences', authenticateUser, userController.updateUserPreferences);

export default router;
