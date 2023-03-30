import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSelected } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { PAGE_EVENTS_DEFAULT } from '../../helpers/constants';
import { useWishlist } from '../../hooks/wishlist';

const WishlistButton = (props) => {
  const { product, className, page } = props;
  const { addProductToWishlist, isProductInWishlist, removeProductFromWishlist } = useWishlist();
  const { sku } = product;
  const isInWishlist = isProductInWishlist(sku);

  const onClickHandler = useCallback(() => {
    if (!isInWishlist) {
      addProductToWishlist(product, page);
    } else {
      removeProductFromWishlist(sku);
    }
  }, [sku, isInWishlist]);

  return (
    <button
      type="button"
      className={`btn ${className}`}
      title={!isInWishlist ? 'Add to wishlist' : 'Remove from wishlist'}
      onClick={onClickHandler}
      data-favorited={!!isInWishlist}
    >
      <FontAwesomeIcon icon={!isInWishlist ? faHeart : faHeartSelected} />
    </button>
  );
};

WishlistButton.propTypes = {
  product: PropTypes.shape({
    sku: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  page: PropTypes.string,
};

WishlistButton.defaultProps = {
  className: '',
  page: PAGE_EVENTS_DEFAULT,
};

export default WishlistButton;
