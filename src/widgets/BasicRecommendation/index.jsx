import { skuContextWidget, useRecommendation, widget, WidgetDataType } from '@sitecore-discover/react';
import PropTypes from 'prop-types';
import React from 'react';

import { Header, ProductsGrid, RecommendationContainer } from './styled';

// eslint-disable-next-line import/no-cycle
import ProductCard from '../ProductCard';

export const Recommendation = (props) => {
  const { displayQuickView, title, productsToDisplay, ...restProps } = props;
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
              <ProductCard
                product={p}
                key={`product-${index}`}
                onProductClick={onProductClick}
                displayQuickView={displayQuickView}
              />
            ))}
          </ProductsGrid>
        </>
      )}
    </RecommendationContainer>
  );
};

Recommendation.propTypes = {
  title: PropTypes.string,
  productsToDisplay: PropTypes.number,
  displayQuickView: PropTypes.bool,
};

Recommendation.defaultProps = {
  title: '',
  productsToDisplay: 4,
  displayQuickView: true,
};
const RecommendationWidget = widget(Recommendation, WidgetDataType.RECOMMENDATION);
export const RecommendationSkuContextWidget = skuContextWidget(Recommendation, WidgetDataType.RECOMMENDATION);

export default RecommendationWidget;
