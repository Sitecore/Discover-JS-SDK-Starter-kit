import { useRecommendation, widget, WidgetDataType } from '@sitecore-discover/react';
import PropTypes from 'prop-types';
import React from 'react';

import { Header, ProductsGrid, RecommendationContainer } from './styled';

import ProductCardListView from '../ProductCardListView';

export const RecommendationList = (props) => {
  const { title, productsToDisplay, displayAddToCard, displaySku, displayQuickView, ...restProps } = props;
  const {
    actions: { onProductClick },
    queryResult: { isLoading, isFetching, data: { content: { product: { value: products = [] } = {} } = {} } = {} },
  } = useRecommendation((query) => {
    query.getRequest().setNumberProducts(productsToDisplay);
  });

  const ready = !isLoading && !isFetching && products.length > 0;

  return (
    <RecommendationContainer {...restProps}>
      {ready && (
        <>
          {title && <Header>{title}</Header>}

          <ProductsGrid>
            {products.map((p, index) => (
              <ProductCardListView
                product={p}
                key={`product-${index}`}
                onProductClick={onProductClick}
                displayAddToCard={displayAddToCard}
                displaySku={displaySku}
                displayQuickView={displayQuickView}
              />
            ))}
          </ProductsGrid>
        </>
      )}
    </RecommendationContainer>
  );
};

RecommendationList.propTypes = {
  title: PropTypes.string,
  productsToDisplay: PropTypes.number,
  displayAddToCard: PropTypes.bool,
  displaySku: PropTypes.bool,
  displayQuickView: PropTypes.bool,
};

RecommendationList.defaultProps = {
  title: '',
  productsToDisplay: 3,
  displayAddToCard: false,
  displaySku: false,
  displayQuickView: true,
};
const RecommendationListWidget = widget(RecommendationList, WidgetDataType.RECOMMENDATION);
export default RecommendationListWidget;
