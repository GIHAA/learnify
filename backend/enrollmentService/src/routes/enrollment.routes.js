import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { celebrate } from 'celebrate';
import { addEnrollment, getPaymentIntent , getAllEnrollments , getOneEnrollment, removeEnrollment, updateEnrollment } from '@/controllers/enrollment';
import { orderRequestAdd } from '@/validations/enrollment';


const enrollment = express.Router();

enrollment.post('/create-payment-intent', tracedAsyncHandler(getPaymentIntent));
enrollment.post('/', tracedAsyncHandler(addEnrollment));
enrollment.get('/', tracedAsyncHandler(getAllEnrollments));
enrollment.get('/:id', tracedAsyncHandler(getOneEnrollment));
enrollment.patch('/:id' ,tracedAsyncHandler(updateEnrollment));
enrollment.delete('/:id', tracedAsyncHandler(removeEnrollment));

export default enrollment;
