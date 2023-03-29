import { useRecommendation, widget, WidgetDataType } from '@sitecore-discover/react';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getProductUrl from '../../helpers/getProductUrl';
import { PageEventContext } from '../../hocs/withPageTracking';
import { useCart } from '../../hooks/cart';
import { Header } from '../BasicRecommendation/styled';
import { ProductCheckboxList, ProductListView, PurchaseTogetherContainer, RecommendationContainer } from './styled';

const ProductListViewItem = ({ product, displayPlusItem, isCurrentProduct, onProductClick }) => {
  const navigate = useNavigate();

  return (
    <>
      <ProductListView.Item>
        {isCurrentProduct ? (
          <ProductListView.Image src={product.image_url} />
        ) : (
          <ProductListView.Link
            to={getProductUrl(product)}
            onClick={(event) => {
              event.preventDefault();
              onProductClick({ sku: product.sku || '' });
              navigate(getProductUrl(product));
            }}
          >
            <ProductListView.Image src={product.image_url} />
          </ProductListView.Link>
        )}
      </ProductListView.Item>
      {displayPlusItem && (
        <ProductListView.PlusItem>
          <span>+</span>
        </ProductListView.PlusItem>
      )}
    </>
  );
};

ProductListViewItem.propTypes = {
  product: PropTypes.shape({
    sku: PropTypes.string,
    name: PropTypes.string,
    image_url: PropTypes.string,
    final_price: PropTypes.string,
    sku_url_key: PropTypes.string,
  }).isRequired,
  displayPlusItem: PropTypes.bool.isRequired,
  isCurrentProduct: PropTypes.bool.isRequired,
  onProductClick: PropTypes.func.isRequired,
};

const PurchaseTogetherListView = ({ products, productsToRemove, currentSku, onProductClick }) => {
  const { addProductsToCart } = useCart();
  const page = useContext(PageEventContext);
  const productsToBuy = products.filter((p) => !productsToRemove[p.sku]);
  const onAddToCartClick = () => {
    addProductsToCart(productsToBuy, page);
  };
  const totalPrice = productsToBuy.reduce((accumulator, product) => accumulator + Number(product.final_price), 0);

  return (
    <PurchaseTogetherContainer>
      {productsToBuy.length > 0 && (
        <>
          <ProductListView.List>
            {productsToBuy.map((p, index) => (
              <ProductListViewItem
                key={p.sku}
                product={p}
                displayPlusItem={index + 1 < productsToBuy.length}
                isCurrentProduct={p.sku === currentSku}
                onProductClick={onProductClick}
              />
            ))}
          </ProductListView.List>
          <ProductListView.PriceDetailsContainer>
            <ProductListView.PriceDetails>
              Total Price: <strong>${totalPrice}</strong>
            </ProductListView.PriceDetails>
            <button
              type="button"
              className="btn btn-sm btn-primary me-2"
              title="Add to cart"
              onClick={onAddToCartClick}
            >
              Add items to cart
            </button>
          </ProductListView.PriceDetailsContainer>
        </>
      )}
    </PurchaseTogetherContainer>
  );
};

PurchaseTogetherListView.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      sku: PropTypes.string,
      name: PropTypes.string,
      image_url: PropTypes.string,
      final_price: PropTypes.string,
      sku_url_key: PropTypes.string,
    }),
  ),
  productsToRemove: PropTypes.objectOf(PropTypes.bool),
  currentSku: PropTypes.string.isRequired,
  onProductClick: PropTypes.func.isRequired,
};
PurchaseTogetherListView.defaultProps = { products: [], productsToRemove: {} };

const PurchaseTogetherCheckboxList = ({ products, productsToRemove, currentSku, onProductClick, onCheckboxClick }) => {
  const navigate = useNavigate();
  return (
    <ProductCheckboxList.List>
      {products.map((p) => (
        <ProductCheckboxList.Item key={p.sku}>
          <ProductCheckboxList.Label className="form-check-label" htmlFor={`purchaseTogether-${p.sku}`}>
            <input
              className="form-check-input me-1"
              id={`purchaseTogether-${p.sku}`}
              type="checkbox"
              onChange={() => onCheckboxClick(p.sku)}
              checked={!productsToRemove[p.sku]}
            />

            {p.sku === currentSku ? (
              <ProductCheckboxList.Name className={!productsToRemove[p.sku] ? '' : 'text-muted'}>
                {p.name}
              </ProductCheckboxList.Name>
            ) : (
              <ProductCheckboxList.Link
                className={!productsToRemove[p.sku] ? '' : 'text-muted'}
                to={getProductUrl(p)}
                onClick={(event) => {
                  event.preventDefault();
                  onProductClick({ sku: p.sku || '' });
                  navigate(getProductUrl(p));
                }}
              >
                <ProductCheckboxList.Name className={!productsToRemove[p.sku] ? '' : 'text-muted'}>
                  {p.name}
                </ProductCheckboxList.Name>
              </ProductCheckboxList.Link>
            )}
            <ProductCheckboxList.Price>${p.final_price}</ProductCheckboxList.Price>
          </ProductCheckboxList.Label>
        </ProductCheckboxList.Item>
      ))}
    </ProductCheckboxList.List>
  );
};

PurchaseTogetherCheckboxList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      sku: PropTypes.string,
      name: PropTypes.string,
      image_url: PropTypes.string,
      final_price: PropTypes.string,
      sku_url_key: PropTypes.string,
    }),
  ),
  currentSku: PropTypes.string.isRequired,
  onProductClick: PropTypes.func.isRequired,
  productsToRemove: PropTypes.objectOf(PropTypes.bool),
  onCheckboxClick: PropTypes.func.isRequired,
};

PurchaseTogetherCheckboxList.defaultProps = {
  products: [],
  productsToRemove: {},
};

export const FrequentlyBoughtTogetherRecommendation = () => {
  const {
    actions: { onProductClick },
    queryResult: { isLoading, isFetching, data: { content: { product: { value: products = [] } = {} } = {} } = {} },
  } = useRecommendation((query) => {
    query.getRequest().setNumberProducts(3);
  });
  const ready = !isLoading && !isFetching && products.length > 1;
  const skuCurrentProduct = products[0]?.sku;
  const [productsToRemove, setProductsToRemove] = useState({});

  const onCheckboxClick = (sku) => {
    setProductsToRemove((productsToRemovePrev) => ({ ...productsToRemovePrev, [sku]: !productsToRemovePrev[sku] }));
  };

  return (
    <>
      <RecommendationContainer>
        {ready && skuCurrentProduct && (
          <>
            <Header>Frequently bought together</Header>
            <PurchaseTogetherListView
              {...{
                products,
                productsToRemove,
                onProductClick,
                currentSku: skuCurrentProduct,
              }}
            />
            <PurchaseTogetherCheckboxList
              {...{
                products,
                productsToRemove,
                currentSku: skuCurrentProduct,
                onProductClick,
                onCheckboxClick,
              }}
            />
          </>
        )}
      </RecommendationContainer>
    </>
  );
};
const FrequentlyBoughtTogetherRecommendationWidget = widget(
  FrequentlyBoughtTogetherRecommendation,
  WidgetDataType.RECOMMENDATION,
);
export default FrequentlyBoughtTogetherRecommendationWidget;
