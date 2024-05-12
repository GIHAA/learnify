import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import {  getPaymentIntent , getPaymentDetails  , getAdminOrderDashboard } from '@/controllers/payment';

const payment = express.Router();

payment.get('/admin-dashboard', tracedAsyncHandler(getAdminOrderDashboard));
payment.get('/:id', tracedAsyncHandler(getPaymentDetails));
payment.post('/create-payment-intent', tracedAsyncHandler(getPaymentIntent));

export default payment;
