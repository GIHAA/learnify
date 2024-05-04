import { protect } from '@/middleware/auth';
import express from 'express';
import enrollmentRouter from './payment.routes';

const router = express.Router();

router.use('/payment' , enrollmentRouter);

export default router;
