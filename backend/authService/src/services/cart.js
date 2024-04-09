import { User } from '@/models';


async function addToCart(userId, productId, quantity = 1) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const existingItem = user.cart.find((item) => item.productId.equals(productId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }
    await user.save();
    return user.cart;
  } catch (error) {
    throw error;
  }
}

async function getCart(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user.cart;
  } catch (error) {
    throw error;
  }
}

async function updateCartItemQuantity(userId, productId, quantity) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const cartItem = user.cart.find((item) => item.productId.equals(productId));
    if (!cartItem) {
      throw new Error('Cart item not found');
    }
    cartItem.quantity = quantity;
    await user.save();
    return user.cart;
  } catch (error) {
    throw error;
  }
}

async function removeFromCart(userId, productId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.cart = user.cart.filter((item) => !item.productId.equals(productId));
    await user.save();
    return user.cart;
  } catch (error) {
    throw error;
  }
}

export { addToCart, getCart, updateCartItemQuantity, removeFromCart };