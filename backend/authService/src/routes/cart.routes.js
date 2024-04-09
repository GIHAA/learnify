// routes/cartRoutes.js
import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { Segments, celebrate } from 'celebrate';
import { addProductToCart, getUserCart, removeItemFromCart, updateCartItem } from '@/controllers/cart';
import { adminProtect, protect } from '@/middleware/auth';


// import {
//   addUserSchema,
//   changePasswordSchema,
//   updateSchema,
//   userIdSchema
// } from '@/validations/user';

const cart = express.Router();

cart.post('/:id', tracedAsyncHandler(addProductToCart));
cart.get('/:id', tracedAsyncHandler(getUserCart));
cart.put('/:id', tracedAsyncHandler(updateCartItem));
cart.delete('/:id', tracedAsyncHandler(removeItemFromCart));

export default cart;