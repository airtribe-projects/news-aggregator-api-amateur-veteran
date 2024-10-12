import express from 'express';
import { authenticateUser } from '../middleware/auth';
import newsController from '../controller/news';


const router = express.Router();

router.get('/', authenticateUser, newsController.getNews);

export default router;