import { addEnrollmentService , getPaymentIntentService , getAllEnrollmentsService, getOneEnrollmentService, getPaymentDetailsService ,  updateEnrollmentService , removeEnrollmentService  } from '@/services/enrollment';
import { makeResponse } from '@/utils/response';

export const addEnrollment = async (req, res) => {
  const ProducateData = req.body;
  const order = await addEnrollmentService(ProducateData);
  return makeResponse({ res, data: order, message: 'enrollment added successfully' });
 
};
export const getAllEnrollments = async (req, res) => {
  const orders = await getAllEnrollmentsService(req.query);
  return makeResponse({ res, data: orders, message: 'enrollment retrieved All successfully' });
};

export const getOneEnrollment = async (req, res) => {
  const orders = await getOneEnrollmentService(req.params.id);
  return makeResponse({ res, data: orders, message: 'enrollment retrieved successfully' });
};

export const updateEnrollment = async (req, res) => {
  const orders = await updateEnrollmentService(req.params.id, req.body);
  return makeResponse({ res, data: orders, message: 'enrollment updated successfully' });
};

export const removeEnrollment = async (req, res) => {
  const orders = await removeEnrollmentService(req.params.id);
  return makeResponse({ res, data: orders, message: 'enrollment removed successfully' });
};

export const getPaymentIntent = async (req, res) => {
  const paymentIntent = await getPaymentIntentService(req.body);
  return makeResponse({ res, data: paymentIntent, message: 'Payment Intent created successfully' });
}

export const getPaymentDetails = async (req, res) => {
  const paymentIntent = await getPaymentDetailsService(req.params.id);
  return makeResponse({ res, data: paymentIntent, message: 'Payment Intent Fetched successfully' });
}