import { addToCart, getCart, removeFromCart, updateCartItemQuantity } from '@/services/cart';
import { makeResponse } from '@/utils/response';

export const addProductToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await addToCart(req.params.id, productId, quantity);
  return makeResponse({ res, data: cart, message: 'Item added to cart successfully' });
};

export const getUserCart = async (req, res) => {
  const cart = await getCart(req.params.id);
  return makeResponse({ res, data: cart, message: 'Cart retrieved successfully' });
};

export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await updateCartItemQuantity(req.params.id, productId, quantity);
  return makeResponse({ res, data: cart, message: 'Cart updated successfully' });
};

export const removeItemFromCart = async (req, res) => {
  const { productId } = req.body;
  const cart = await removeFromCart(req.params.id, productId);
  return makeResponse({ res, data: cart, message: 'item removed from cart successfully' });
};
