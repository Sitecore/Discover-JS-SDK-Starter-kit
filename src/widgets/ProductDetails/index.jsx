/**
 * This component has been done using a SearchResults widget that uses a filter by sku since there isn't a datasource, to get the producct information.
 * It is not recommended to perform this in this way (usually the way that a Product Detail Page looks is handled by the SDK consumer and the data is gathered by their own datasets).
 * Sitecore Discover Services are used to search and recommend.
 * So this is just an example for demo proposal.
 */
/* eslint-disable camelcase */
import { faCartPlus, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {trackPDPViewEvent, useSearchResults, widget, WidgetDataType} from '@sitecore-discover/react';
import { ReactComponent as IconStarFill } from 'bootstrap-icons/icons/star-fill.svg';
import PropTypes from 'prop-types';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import WishlistButton from '../../components/WishlistButton';
import getProductUrl from '../../helpers/getProductUrl';
import { PageEventContext } from '../../hocs/withPageTracking';
import { useCart } from '../../hooks/cart';

const MAX_RATING = 5;

const ProductRating = ({ review_rating }) => {
  const ratingRows = [];
  let className;
  for (let i = 1; i <= MAX_RATING; i += 1) {
    className = review_rating >= i ? 'text-warning' : 'text-secondary';
    ratingRows.push(<IconStarFill className={`${className}  me-1`} key={i} />);
  }

  return <>{ratingRows}</>;
};

ProductRating.propTypes = {
  review_rating: PropTypes.number,
};

ProductRating.defaultProps = {
  review_rating: 0,
};

// eslint-disable-next-line no-unused-vars
const ProductDetails = (props) => {
  const { addProductToCart } = useCart();
  const page = useContext(PageEventContext);

  const {
    queryResult: { isLoading, data: { content: { product: { value: products = [] } = {} } = {} } = {} },
  } = useSearchResults();

  const product = products.length > 0 ? products[0] : null;
  let content = <>{isLoading && <Loader enabled={isLoading} />}</>;

  useEffect(() => {
    trackPDPViewEvent(product.sku);
  }, [product.sku]);

  const [productQuantity, setProductQuantity] = useState(1);
  const handleQuantityChange = useCallback(
    (event) => {
      setProductQuantity(event.target.value);
    },
    [productQuantity],
  );

  const handleAddQuantity = useCallback(() => {
    const quantity = productQuantity + 1;
    setProductQuantity(quantity);
  }, [productQuantity]);
  const handleRemoveQuantity = useCallback(() => {
    const quantity = productQuantity - 1;
    setProductQuantity(quantity);
  }, [productQuantity]);

  const onAddToCartClick = useCallback(() => {
    addProductToCart(product, productQuantity, page);
  }, [product, productQuantity]);

  if (!isLoading && product) {
    const {
      brand,
      colors,
      description,
      final_price,
      free_shipping,
      image_url,
      name,
      price,
      review_count,
      review_rating,
      sale_flag,
      sale_status,
      sku,
      size,
      swatch,
    } = product;
    const discount = parseFloat(price) - parseFloat(final_price);

    content = (
      <>
        <div>
          <div className="row mb-3">
            <div className="col-md-5 text-center">
              <img src={image_url} className="img-fluid mb-3 sticky-md-top" alt="" />
            </div>
            <div className="col-md-7">
              <h1 className="h4 d-inline me-2">{name}</h1>
              {brand && <h2 className="h6 text-muted me-2">Brand: {brand}</h2>}
              {sale_flag === '1' && <span className="badge bg-danger me-2">{sale_status}</span>}
              {review_rating && (
                <div className="mb-3">
                  <ProductRating review_rating={review_rating} />{' '}
                  <span className="text-muted small">({review_count} reviews)</span>
                </div>
              )}

              <div className="mb-3">
                <span className="fw-bold h3 me-2">${final_price}</span>
                {discount > 0 && <del className="small text-muted me-2">${price}</del>}
                {discount > 0 && <span className="rounded p-1 bg-warning  me-2 small">-${discount}</span>}
              </div>

              <dl className="row small mb-3">
                <dt className="col-sm-3">Availability</dt>
                <dd className="col-sm-9">In stock</dd>
                {free_shipping === '1' && <dt className="col-sm-3">Promotions</dt>}
                {free_shipping === '1' && <dd className="col-sm-9">Free shipping</dd>}
                {colors && <dt className="col-sm-3">Color/s</dt>}
                {colors && <dd className="col-sm-9">{colors.join(', ')}</dd>}
                {size && <dt className="col-sm-3">Size</dt>}
                {size && <dd className="col-sm-9">{size}</dd>}

                {swatch && <dt className="col-sm-3">Other Sizes</dt>}
                {swatch && (
                  <dd className="col-sm-9">
                    {swatch.map(
                      (p, index) =>
                        p.stock_quantity > 0 &&
                        p.sku !== sku && (
                          <Link key={`sizes-${index}`} className="me-2" to={getProductUrl(p)}>
                            {p.size}
                          </Link>
                        ),
                    )}
                  </dd>
                )}
              </dl>
              <div className="mb-3">
                <div className="d-inline float-start me-2">
                  <div className="input-group input-group-m mw-140">
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={handleRemoveQuantity}
                      disabled={productQuantity === 1}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      value={productQuantity}
                      onChange={handleQuantityChange}
                    />
                    <button className="btn btn-primary text-white" type="button" onClick={handleAddQuantity}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-m btn-primary me-2"
                  title="Add to cart"
                  onClick={onAddToCartClick}
                >
                  <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                </button>
                <WishlistButton className="btn-m btn-outline-secondary" product={product} page={page} />
              </div>
              <hr />
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default widget(ProductDetails, WidgetDataType.RECOMMENDATION);
