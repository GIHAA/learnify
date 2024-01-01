import { addProductnew ,getProduct,getProductbtID,updatProduct,deleteProduct,findImage } from '@/services/product';
import { makeResponse } from '@/utils/response';

export const addorder = async (req, res) => {
  const ProducateData = req.body;
  const order = await addProductnew(ProducateData);
  return makeResponse({ res, data: order, message: 'product added successfully' });
 
};
export const getAll = async (req, res) => {
  const orders = await getProduct(req.query);
  return makeResponse({ res, data: orders, message: 'product retrieved All successfully' });
};

export const getById = async (req, res) => {
  const orders = await getProductbtID(req.params.id);
  return makeResponse({ res, data: orders, message: 'product retrieved successfully' });
};

export const update = async (req, res) => {
  const orders = await updatProduct(req.params.id, req.body);
  return makeResponse({ res, data: orders, message: 'product updated successfully' });
};

export const remove = async (req, res) => {
  const orders = await deleteProduct(req.params.id);
  return makeResponse({ res, data: orders, message: 'product removed successfully' });
};