import { protect } from '@/middleware/auth';
import express from 'express';
import productRouter from './image.routes';

const router = express.Router();

router.use('/user-images', productRouter);

export default router;
