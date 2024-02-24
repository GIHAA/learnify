import { addFeedbacknew ,getFeedback,getFeedbackbtID,updatFeedback,deleteFeedback  } from '@/services/feedback';
import { makeResponse } from '@/utils/response';

export const addFeedback = async (req, res) => {
  const ProducateData = req.body;
  const order = await addFeedbacknew(ProducateData);
  return makeResponse({ res, data: order, message: 'feedback added successfully' });
 
};
export const getAll = async (req, res) => {
  const orders = await getFeedback(req.query);
  return makeResponse({ res, data: orders, message: 'feedback retrieved All successfully' });
};

export const getById = async (req, res) => {
  const orders = await getFeedbackbtID(req.params.id);
  return makeResponse({ res, data: orders, message: 'feedback retrieved successfully' });
};

export const update = async (req, res) => {
  const orders = await updatFeedback(req.params.id, req.body);
  return makeResponse({ res, data: orders, message: 'feedback updated successfully' });
};

export const remove = async (req, res) => {
  const orders = await deleteFeedback(req.params.id);
  return makeResponse({ res, data: orders, message: 'feedback removed successfully' });
};