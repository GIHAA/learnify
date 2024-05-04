import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { addEnrollment, getPaymentIntent , getPaymentDetails , getAllEnrollments , getOneEnrollment, removeEnrollment, updateEnrollment } from '@/controllers/enrollment';

const enrollment = express.Router();

enrollment.post('/create-payment-intent', tracedAsyncHandler(getPaymentIntent));
enrollment.get('/payments/:id', tracedAsyncHandler(getPaymentDetails));
enrollment.post('/', tracedAsyncHandler(addEnrollment));
enrollment.get('/', tracedAsyncHandler(getAllEnrollments));
enrollment.get('/:id', tracedAsyncHandler(getOneEnrollment));
enrollment.patch('/:id' ,tracedAsyncHandler(updateEnrollment));
enrollment.delete('/:id', tracedAsyncHandler(removeEnrollment));

export default enrollment;
