import { CheckCircledIcon } from '@radix-ui/react-icons';
import { PageController, trackOrderConfirmEvent } from '@sitecore-discover/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DUMMY_USER } from '../../data/constants';
import { PAGE_EVENTS_ORDER } from '../../helpers/constants';
import getProductUrl from '../../helpers/getProductUrl';
import withPageTracking from '../../hocs/withPageTracking';
import { useCart } from '../../hooks/cart';
import CustomPageWidgets from '../../widgets/CustomPageWidgets';

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const OrderView = () => {
  const { cart, clearCart, orderTotal: total, orderSubTotal: subtotal, discount: totalDiscount } = useCart();
  const [orderProducts, setOrderProducts] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderSubTotal, setOrderSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const cartItems = [];
    const skusItems = [];
    cart.forEach((item) => {
      skusItems.push(item.data.sku);
      cartItems.push({
        quantity: item.quantity,
        sku: item.data.sku,
        price: item.data.final_price,
        priceOriginal: item.data.price,
        image: item.data.image_url,
        name: item.data.name,
        discount: parseFloat(item.data.price) - parseFloat(item.data.final_price),
      });
    });
    trackOrderConfirmEvent(
      cartItems.map(({ quantity, price, priceOriginal, sku }) => ({ quantity, price, priceOriginal, sku })),
      DUMMY_USER,
      {
        orderId: makeid(32),
        total,
        subtotal,
      },
      PageController.getContext().toJson(),
    );
    setOrderTotal(total);
    setOrderSubTotal(subtotal);
    setOrderProducts(cartItems);
    setDiscount(totalDiscount);
    clearCart();
    PageController.getContext().setPageSkus(skusItems);

    return () => {
      PageController.getContext().resetPageSkus();
    };
  }, []);
  return (
    <>
      <div className="container mb-5 mt-3">
        <div className="text-center">
          <CheckCircledIcon width={50} height={50} className="text-success" />
          <h1 className="display-3">Thanks for your order!</h1>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h3 className="mb-3">Order Summary</h3>
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width={120}>
                        Quantity
                      </th>
                      <th scope="col" width={150}>
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderProducts.map((p) => (
                      <tr key={p.sku}>
                        <td>
                          <div className="row">
                            <div className="col-3 d-none d-md-block">
                              <img src={p.image} width="80" alt={p.name} />
                            </div>
                            <div className="col">
                              <Link to={getProductUrl(p)} className="text-decoration-none">
                                {p.name}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="input-group input-group-sm mw-140">
                            <span>{p.quantity}</span>
                          </div>
                        </td>
                        <td>
                          {p.discount > 0 && <del className="text-muted me-2">${p.priceOriginal * p.quantity}</del>}
                          <var className="price">${p.price * p.quantity}</var>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="card-footer">
                  <div className="card-order-footer">
                    <div className="card-total-wrapper">
                      <div className="card-row card-subtotal">
                        <div className="card-row-left">SUBTOTAL:</div>
                        <div className="card-row-right">${orderSubTotal}</div>
                      </div>
                      {discount > 0 && (
                        <div className="card-row card-discount">
                          <div className="card-row-left text-success">DISCOUNT:</div>
                          <div className="card-row-right text-success">-${discount}</div>
                        </div>
                      )}
                      <div className="card-row card-total">
                        <div className="card-row-left">TOTAL:</div>
                        <div className="card-row-right">${orderTotal}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 mt-5">
            <CustomPageWidgets />
          </div>
        </div>
      </div>
    </>
  );
};

export default withPageTracking(OrderView, PAGE_EVENTS_ORDER);
