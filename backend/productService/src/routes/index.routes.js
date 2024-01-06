import { protect } from '@/middleware/auth';
import express from 'express';
import productRouter from './product.routes';

const router = express.Router();

router.use('/order', protect , productRouter);

export default router;
