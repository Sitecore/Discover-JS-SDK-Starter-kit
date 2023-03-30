import { PageController, trackStatusCartEvent } from '@sitecore-discover/react';
import { ReactComponent as IconChevronLeft } from 'bootstrap-icons/icons/chevron-left.svg';
import { ReactComponent as IconChevronRight } from 'bootstrap-icons/icons/chevron-right.svg';
import { ReactComponent as IconTruck } from 'bootstrap-icons/icons/truck.svg';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../../components/Cart';
import { PAGE_EVENTS_CART } from '../../helpers/constants';
import withPageTracking from '../../hocs/withPageTracking';
import { useCart } from '../../hooks/cart';
import CustomPageWidgets from '../../widgets/CustomPageWidgets';

const CartView = () => {
  const { cart, discount, orderTotal, orderSubTotal } = useCart();
  const [trackCart, setTrackCartStatus] = useState(true);
  const [skus, setSkus] = useState([]);
  const trackCartStatusEvent = useCallback(() => setTrackCartStatus(true), []);

  useEffect(() => {
    const skusItems = [];

    cart.forEach((item) => {
      skusItems.push(item.data.sku);
    });
    setSkus(skusItems);
    PageController.getContext().setPageSkus(skusItems);

    return () => {
      PageController.getContext().resetPageSkus();
    };
  }, []);

  useEffect(() => {
    if (trackCart) {
      // Cart status event will be tracked when client access to cart page or when a product is removed from the bag
      trackStatusCartEvent(
        cart.map(
          (p) => ({
            quantity: p.quantity,
            sku: p.data.sku,
            price: p.data.final_price,
            priceOriginal: p.data.price,
          }),
          PageController.getContext().toJson(),
        ),
      );
      setTrackCartStatus(false);
    }
  }, [cart, trackCart]);

  return (
    <>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Shopping Cart</h1>
      </div>
      <div className="container mb-3">
        {skus.length > 0 ? (
          <div className="row">
            <div className="col-md-9">
              <div className="card">
                <Cart trackCartStatusEvent={trackCartStatusEvent} />
                <div className="card-footer">
                  <Link to="/order/confirmation" className="btn btn-primary float-end">
                    Make Purchase <IconChevronRight className="i-va" />
                  </Link>
                  <Link to="/" className="btn btn-secondary">
                    <IconChevronLeft className="i-va" /> Continue shopping
                  </Link>
                </div>
              </div>
              <div className="alert alert-success mt-3">
                <p className="m-0">
                  <IconTruck className="i-va me-2" /> Free Delivery within 1-2 weeks
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <dl className="row border-bottom">
                    <dt className="col-6">Total price:</dt>
                    <dd className="col-6 text-end">${orderTotal}</dd>

                    {discount ? <dt className="col-6 text-success">Discount:</dt> : ''}
                    {discount ? <dd className="col-6 text-success text-end">-${discount}</dd> : ''}
                  </dl>
                  <dl className="row">
                    <dt className="col-6">Total:</dt>
                    <dd className="col-6 text-end  h5">
                      <strong>${orderSubTotal}</strong>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="display-6">Your cart is empty</p>
            <hr />
          </>
        )}
      </div>

      <CustomPageWidgets className="container mb-5" />

      <div className="bg-light border-top p-4">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </div>
    </>
  );
};

export default withPageTracking(CartView, PAGE_EVENTS_CART);
