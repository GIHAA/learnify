import express from 'express';
import { protect } from '@/middleware/auth';
import orderRouter from './product.routes';

const router = express.Router();

router.use('/order', protect, orderRouter);

export default router;
