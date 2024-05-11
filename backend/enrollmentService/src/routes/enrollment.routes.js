import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { addEnrollment , getAllEnrollments , getUserEnrollments , getOneEnrollment, removeEnrollment, updateEnrollment } from '@/controllers/enrollment';

const enrollment = express.Router();


enrollment.post('/', tracedAsyncHandler(addEnrollment));
enrollment.get('/', tracedAsyncHandler(getAllEnrollments));
enrollment.get('/user/:id', tracedAsyncHandler(getUserEnrollments));
enrollment.get('/:id', tracedAsyncHandler(getOneEnrollment));
enrollment.patch('/:id' ,tracedAsyncHandler(updateEnrollment));
enrollment.delete('/:id', tracedAsyncHandler(removeEnrollment));

export default enrollment;
