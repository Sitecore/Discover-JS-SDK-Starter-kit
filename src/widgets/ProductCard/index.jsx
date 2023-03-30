import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getProductUrl from '../../helpers/getProductUrl';
// eslint-disable-next-line import/no-cycle
import ProductCardModal from '../../components/ProductCardModal';
import { PageEventContext } from '../../hocs/withPageTracking';
import { useCart } from '../../hooks/cart';
import ProductCardStyled from './styled';

const ProductCard = (props) => {
  const {
    product,
    displayQuickView,
    displaySku = true,
    displayAddToCard = true,
    onProductClick = ({ sku }) => sku,
    ...respProps
  } = props;
  const { addProductToCart } = useCart();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const discount = parseFloat(product.price) - parseFloat(product.final_price);
  const navigate = useNavigate();
  const page = useContext(PageEventContext);
  return (
    <>
      <ProductCardStyled.Root product={product} {...respProps}>
        <ProductCardStyled.ButtonContainer>
          {displayQuickView && (
            <>
              <ProductCardStyled.QuickView
                onClick={handleShow}
                className="btn btn-secondary text-white quickView"
                title="Quick View"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </ProductCardStyled.QuickView>
              <ProductCardModal product={product} handleClose={handleClose} show={show} />
            </>
          )}
          {displayAddToCard && (
            <ProductCardStyled.AddToCart
              className="btn btn-primary text-white addToCart"
              onClick={() => addProductToCart({ ...product }, 1, page)}
              title="Add to Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="i-va"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </ProductCardStyled.AddToCart>
          )}
        </ProductCardStyled.ButtonContainer>
        <ProductCardStyled.Image />
        {displaySku && <ProductCardStyled.Sku />}
        <ProductCardStyled.Name>
          <ProductCardStyled.Link
            to={getProductUrl(product)}
            onClick={(event) => {
              event.preventDefault();
              onProductClick({ sku: product.sku || '' });
              navigate(getProductUrl(product));
            }}
          >
            {product.name}
          </ProductCardStyled.Link>
        </ProductCardStyled.Name>
        <ProductCardStyled.PriceContainer>
          {discount > 0 && <del className="small text-muted">${product.price}</del>}
          {product.final_price && <ProductCardStyled.Price>${product.final_price}</ProductCardStyled.Price>}
        </ProductCardStyled.PriceContainer>
      </ProductCardStyled.Root>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.string,
    final_price: PropTypes.string,
    sku: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  displaySku: PropTypes.bool,
  displayQuickView: PropTypes.bool,
  displayAddToCard: PropTypes.bool,
  onProductClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ProductCard.defaultProps = {
  displaySku: true,
  displayAddToCard: true,
  displayQuickView: true,
  className: '',
};

export default ProductCard;
