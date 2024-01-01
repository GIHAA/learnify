import { addProductnew ,getProduct,getProductbtID,updatProduct,deleteProduct,findImage } from '@/services/order';
import { makeResponse } from '@/utils/response';

export const addorder = async (req, res) => {
  const ProducateData = req.body;
  const image = req.file.filename  ;
  console.log(req.file)
  if (image ) {
    ProducateData.image = image;
  }
  console.log(ProducateData)
  const order = await addProductnew(ProducateData);

  //console.log("ggggggggggggggggggggggggggggggggggggg")
  return makeResponse({ res, data: order, message: 'order added successfully' });
 
};
export const getAll = async (req, res) => {
  const orders = await getProduct(req.query);
  return makeResponse({ res, data: orders, message: 'order retrieved All successfully' });
};

export const getById = async (req, res) => {
  const orders = await getProductbtID(req.params.id);
  return makeResponse({ res, data: orders, message: 'order retrieved successfully' });
};

export const update = async (req, res) => {
  const orders = await updatProduct(req.params.id, req.body);
  return makeResponse({ res, data: orders, message: 'order updated successfully' });
};

export const remove = async (req, res) => {
  const orders = await deleteProduct(req.params.id);
  return makeResponse({ res, data: orders, message: 'order removed successfully' });}

export const imagerectrive = (req, res)=>{

      const {filename} = req.params
      findImage(filename,res);
       
}  