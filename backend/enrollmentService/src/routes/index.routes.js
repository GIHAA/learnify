import express from 'express';
import enrollmentRouter from './enrollment.routes';

const router = express.Router();

router.use('/enrollment' , enrollmentRouter);

export default router;
