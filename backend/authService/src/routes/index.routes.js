import express from 'express';
import { adminProtect, protect } from '@/middleware/auth';
import authRouter from './auth.routes';
import userRouter from './user.routes';


const router = express.Router();

router.use('/auth', authRouter);
//to-do
router.use('/health', () => {console.log('health check')});
router.use('/users', protect, userRouter);



export default router;
