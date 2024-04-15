import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { celebrate } from 'celebrate';
import { addProduct, getAll, getById, remove, update } from '@/controllers/product';
import { orderRequestAdd } from '@/validations/product';


const product = express.Router();

product.post('/', tracedAsyncHandler(addProduct));
product.get('/', tracedAsyncHandler(getAll));
product.get('/:id', tracedAsyncHandler(getById));
product.patch('/:id' ,tracedAsyncHandler(update));
product.delete('/:id', tracedAsyncHandler(remove));

export default product;
