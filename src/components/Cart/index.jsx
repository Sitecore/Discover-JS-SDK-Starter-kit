import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as IconTrash } from 'bootstrap-icons/icons/trash.svg';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getProductUrl from '../../helpers/getProductUrl';
import { PageEventContext } from '../../hocs/withPageTracking';
import { useCart } from '../../hooks/cart';
import WishlistButton from '../WishlistButton';

const Size = ({ size }) =>
  size && (
    <span className="me-2">
      <strong>Size</strong>: {size}
    </span>
  );
Size.propTypes = {
  size: PropTypes.string,
};
Size.defaultProps = {
  size: null,
};
const Brand = ({ brand }) =>
  brand && (
    <span className="me-2">
      <strong>Brand</strong>: {brand}
    </span>
  );
Brand.propTypes = {
  brand: PropTypes.string,
};
Brand.defaultProps = {
  brand: null,
};
const Colors = ({ colors }) =>
  colors && colors.length ? (
    <span className="me-2">
      <strong>Color</strong>: {colors.join(', ')}
    </span>
  ) : (
    <></>
  );

Colors.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
};
Colors.defaultProps = {
  colors: [],
};
const CartComponent = ({ trackCartStatusEvent }) => {
  const { cart, removeProductFromCart, addProductToCart } = useCart();
  const [products, setProducts] = useState(cart);
  const page = useContext(PageEventContext);

  useEffect(() => {
    setProducts(cart);
  }, [cart]);
  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table table-borderless">
          <thead className="text-muted">
            <tr className="small text-uppercase">
              <th scope="col">Product</th>
              <th scope="col" className="text-center" width={150}>
                Price
              </th>
              <th scope="col" width={120}>
                Quantity
              </th>
              <th scope="col" className="text-center" width={150}>
                Total Price
              </th>
              <th scope="col" className="text-end" width={130} />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.data.sku}>
                <td>
                  <div className="row">
                    <div className="col-3 d-none d-md-block">
                      <img src={p.data.image_url} width="80" alt={p.data.name} />
                    </div>
                    <div className="col">
                      <Link to={getProductUrl(p.data)} className="text-decoration-none">
                        {p.data.name}
                      </Link>
                      <p className="small text-muted">
                        <Size size={p.data.size} />
                        <Colors colors={p.data.colors} />
                        <Brand brand={p.data.brand} />
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  {p.data.price !== p.data.final_price && <del className="text-muted me-2">${p.data.price * 1}</del>}
                  <var className="price">${p.data.final_price * 1}</var>
                </td>
                <td>
                  <div className="input-group input-group-sm mw-140">
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={() => {
                        removeProductFromCart(p.data.sku);
                        trackCartStatusEvent();
                      }}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input type="text" className="form-control" value={p.quantity} onChange={() => {}} />
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={() => addProductToCart({ ...p.data }, 1, page)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </td>
                <td className="text-center">
                  <var className="price">${p.data.final_price * p.quantity}</var>
                </td>
                <td className="text-end">
                  <WishlistButton className="btn-sm btn-outline-secondary me-2" product={p.data} page={page} />
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeProductFromCart(p.data.sku, p.quantity)}
                  >
                    <IconTrash className="i-va" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
CartComponent.propTypes = {
  trackCartStatusEvent: PropTypes.func.isRequired,
};

export default CartComponent;
