import { default as createError } from 'http-errors';
import { createproducte, getAllproducte,  getOneproducte, removeproducte, updateproducte,imagefindbyid } from '@/repository/order';
import { producte } from '@/models';
export const addProductnew = async (payload) => {

  console.log(payload)
  const newProduct = await createproducte({
    ...payload
  });
  return newProduct;
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
};

export const getProduct = (query) => getAllproducte(query);

export const getProductbtID = async (id) => {
  const Products = await  getOneproducte({ _id: id });

  if (!Products) throw new createError(401, 'Invalid Product ID');

  return Products;
};

export const updatProduct = async (itemid, payload) => {
  const updatedItems = await updateproducte({ _id: itemid }, payload);
  return updatedItems;
};

export const deleteProduct = async (id) => {
  const Products = await removeproducte({ _id: id });
  if (!Products) throw new createError(401, 'Invalid Product ID');
  return Products;
};

export const findImage = (filename,res)=>{

  imagefindbyid(filename,res)
}
