import { protect } from '@/middleware/auth';
import express from 'express';
import courseRouter from './course.routes';

const router = express.Router();

router.use('/course' , courseRouter);

export default router;
