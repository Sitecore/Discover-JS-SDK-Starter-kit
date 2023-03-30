import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PAGE_EVENTS_QVIEW } from '../../helpers/constants';
import { useCart } from '../../hooks/cart';
// eslint-disable-next-line import/no-cycle
import { RecommendationCarouselSkuContextWidget } from '../../widgets/CarouselRecommendation';
import ProductCardModalStyled from './styled';

const ProductCardModal = ({ show, handleClose, product, className }) => {
  const { sku, name, image_url: imageUrl, final_price: finalPrice, price } = product;
  const discount = parseFloat(price) - parseFloat(finalPrice);
  const { addProductToCart } = useCart();
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className={className}
      size="lg"
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductCardModalStyled.Root className="flex-row mb-3">
          <ProductCardModalStyled.Img variant="top" src={imageUrl} width="50%" className="modalImg" />
          <ProductCardModalStyled.Body>
            <div className="mb-3">
              <span className="fw-bold h3 me-2">${finalPrice}</span>
              {discount > 0 && <del className="text-muted me-2">${price}</del>}
            </div>
            <ProductCardModalStyled.Text>
              Lorem ipsum dolor sit amet, id noster mollis torquatos duo, at mel nobis altera iriure, ad voluptua
              oportere usu. Usu ut soleat nominati laboramus, te ius inani recteque. Ad novum congue pro, quem
              neglegentur eum no. Legere noster signiferumque quo ut, falli veniam posidonium ad mel, per ex iriure
              gloriatur eloquentiam. Saepe copiosae constituto vim eu, et omnes malorum dolorem eum.
            </ProductCardModalStyled.Text>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-m btn-primary me-2"
                title="Add to cart"
                onClick={() => addProductToCart({ ...product }, 1, PAGE_EVENTS_QVIEW)}
              >
                <FontAwesomeIcon icon={faCartPlus} /> Add to cart
              </button>
            </div>
          </ProductCardModalStyled.Body>
        </ProductCardModalStyled.Root>
        {show && (
          <RecommendationCarouselSkuContextWidget
            rfkId="rfkid_31"
            sku={sku}
            title="Similar Products"
            productsToDisplay={12}
            displayQuickView={false}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ProductCardModal.propTypes = {
  product: PropTypes.shape({
    final_price: PropTypes.string,
    price: PropTypes.string,
    sku: PropTypes.string,
    name: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
  show: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};
ProductCardModal.defaultProps = {
  show: false,
  className: '',
};

export default ProductCardModal;
