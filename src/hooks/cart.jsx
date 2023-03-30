/* eslint-disable no-console,react/jsx-no-constructed-context-values */
import { PageController, trackAddToCartEvent } from '@sitecore-discover/react';

import PropTypes from 'prop-types';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { ReactNotifications, Store as Notification } from 'react-notifications-component';
import ProductNotification from '../components/ProductNotification';
import {
  CART_ADD_PRODUCT,
  CART_CLEAR,
  CART_KEY,
  CART_REMOVE_PRODUCT,
  CART_UPDATE_PRODUCT,
  NOTIFICATION_PROPS,
} from '../data/constants';
import { PAGE_EVENTS_DEFAULT } from '../helpers/constants';
import useLocalStorage from './useLocalStorage';

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ADD_PRODUCT: {
      const { cart } = state;
      return { ...state, cart: [...cart, { ...action.payload }] };
    }
    case CART_UPDATE_PRODUCT: {
      const { cart } = state;
      const { id, quantity } = action.payload;
      const newCart = cart.map((item) => {
        if (item.data.sku === id) {
          return { data: item.data, quantity };
        }
        return item;
      });
      return { ...state, cart: newCart };
    }
    case CART_REMOVE_PRODUCT: {
      const { cart } = state;
      const { id, quantity } = action.payload;
      let newCart = [];
      if (quantity <= 0) {
        newCart = cart.filter((item) => item.data.sku !== id);
      } else {
        newCart = cart.map((item) => {
          if (item.data.sku === id) {
            return { data: item.data, quantity };
          }
          return item;
        });
      }
      return { ...state, cart: newCart };
    }
    case CART_CLEAR: {
      return { ...state, cart: [] };
    }
    default:
      return state;
  }
};

export const CartContext = React.createContext({
  cart: [],
  discount: 0,
  orderTotal: 0,
  orderSubTotal: 0,
  addProductToCart: (product, quantity = 1, page = PAGE_EVENTS_DEFAULT) => {
    console.log(product, quantity, page);
  },
  addProductsToCart: (products, page = PAGE_EVENTS_DEFAULT) => {
    console.log(products, page);
  },
  removeProductFromCart: (productId) => {
    console.log(productId);
  },
  clearCart: () => {},
});

export const CartProvider = (props) => {
  const { children } = props;
  const [savedCart, saveCart] = useLocalStorage(CART_KEY, JSON.stringify([]));
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderSubTotal, setOrderSubTotal] = useState(0);
  const [state, dispatch] = useReducer(cartReducer, {
    cart: JSON.parse(savedCart),
  });

  React.useEffect(() => {
    saveCart(JSON.stringify(state.cart));
    let total = 0;
    let subtotal = 0;
    state.cart.forEach((item) => {
      total += +item.data.price * item.quantity;
      subtotal += +item.data.final_price * item.quantity;
    });
    setOrderTotal(total);
    setOrderSubTotal(subtotal);
  }, [state, saveCart]);

  const addProduct = (product, quantity = 1) => {
    if (quantity <= 0) return;
    const currentItem = state.cart.find((i) => i.data.sku === product.sku);
    if (!currentItem) {
      const payload = { data: product, quantity };
      dispatch({ type: CART_ADD_PRODUCT, payload });
    } else {
      const payload = { id: product.sku, quantity: currentItem.quantity + quantity };
      dispatch({
        type: CART_UPDATE_PRODUCT,
        payload,
      });
    }

    Notification.addNotification({
      // eslint-disable-next-line react/no-unstable-nested-components
      content: () => <ProductNotification name={product.name} image_url={product.image_url} action="Adding" />,
      ...NOTIFICATION_PROPS,
    });
  };

  const addProductToCart = (product, quantity = 1, page = PAGE_EVENTS_DEFAULT) => {
    addProduct(product, quantity);

    trackAddToCartEvent(
      [
        {
          sku: product.sku,
          quantity,
          price: product.final_price,
          priceOriginal: product.price,
        },
      ],
      page,
      PageController.getContext().toJson(),
    );
  };

  const addProductsToCart = (products, page = PAGE_EVENTS_DEFAULT) => {
    const productsEventTrack = [];
    products.forEach((product) => {
      addProduct(product, 1);
      productsEventTrack.push({
        sku: product.sku,
        quantity: 1,
        price: product.final_price,
        priceOriginal: product.price,
      });
    });

    trackAddToCartEvent(productsEventTrack, page, PageController.getContext().toJson());
  };

  const removeProductFromCart = (productId, quantity = 1) => {
    if (quantity <= 0) return;
    const currentItem = state.cart.find((i) => i.data.sku === productId);
    if (currentItem) {
      const payload = {
        id: productId,
        quantity: currentItem.quantity - quantity,
      };
      dispatch({ type: CART_REMOVE_PRODUCT, payload });

      Notification.addNotification({
        // eslint-disable-next-line react/no-unstable-nested-components
        content: () => (
          <ProductNotification name={currentItem.data.name} image_url={currentItem.data.image_url} action="Removing" />
        ),
        ...NOTIFICATION_PROPS,
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: CART_CLEAR, payload: {} });
  };

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        addProductsToCart,
        removeProductFromCart,
        clearCart,
        cart: state.cart,
        orderTotal,
        orderSubTotal,
        discount: orderTotal - orderSubTotal,
      }}
    >
      {children}
      <ReactNotifications />
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

CartProvider.defaultProps = {
  children: <></>,
};

export const useCart = () => {
  const {
    cart,
    removeProductFromCart,
    addProductToCart,
    addProductsToCart,
    clearCart,
    orderTotal,
    orderSubTotal,
    discount,
  } = useContext(CartContext);

  useEffect(() => {}, []);
  return {
    cart,
    removeProductFromCart,
    addProductToCart,
    addProductsToCart,
    clearCart,
    orderTotal,
    orderSubTotal,
    discount,
  };
};
