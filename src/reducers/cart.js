/* eslint-disable no-console */
import { CART_KEY, CART_REMOVE_PRODUCT, CART_ADD_PRODUCT } from '../data/constants';

const addProductToCart = (product, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex((item) => item.data.sku === product.sku);

  if (updatedItemIndex < 0) {
    updatedCart.push({ data: product, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity += 1;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  return { ...state, cart: [...updatedCart] };
};

const removeProductFromCart = (productId, state) => {
  console.log(`Removing product with id: ${productId}`);
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex((item) => item.data.sku === productId);

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity -= 1;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }
  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  return { ...state, cart: [...updatedCart] };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case CART_REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);
    default:
      return state;
  }
};

export default cartReducer;
