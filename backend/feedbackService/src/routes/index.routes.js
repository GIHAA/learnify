import { protect } from '@/middleware/auth';
import express from 'express';
import feedbackRouter from './feedback.routes';

const router = express.Router();

router.use('/' , feedbackRouter);

export default router;
