import {  getPaymentIntentService , getPaymentDetailsService  , getAdminOrderDashboardService } from '@/services/payment';
import { makeResponse } from '@/utils/response';



export const getPaymentIntent = async (req, res) => {
  const paymentIntent = await getPaymentIntentService(req.body);
  return makeResponse({ res, data: paymentIntent, message: 'Payment Intent created successfully' });
}

export const getPaymentDetails = async (req, res) => {
  const paymentIntent = await getPaymentDetailsService(req.params.id);
  return makeResponse({ res, data: paymentIntent, message: 'Payment Intent Fetched successfully' });
}

export const getAdminOrderDashboard = async (req, res) => {
  const orderDashboard = await getAdminOrderDashboardService();
  return makeResponse({ res, data: orderDashboard, message: 'Admin Order Dashboard Fetched successfully' });
}