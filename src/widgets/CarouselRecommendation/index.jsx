/**
 * Recommendation widget that it is using Carousel example
 */
import { skuContextWidget, useRecommendation, widget, WidgetDataType } from '@sitecore-discover/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Header } from '../BasicRecommendation/styled';
// eslint-disable-next-line import/no-cycle
import ProductCard from '../ProductCard';

import {
  CarouselContainer,
  LeftIcon,
  NextButton,
  PrevButton,
  RecommendationContainer,
  RightIcon,
  Slide,
  SliderList,
} from './styled';

export const RecommendationCarousel = ({ displayQuickView, productsToDisplay, title, ...restProps }) => {
  const {
    actions: { isLoading, onProductClick, onNavigationNext, onNavigationPrev },
    queryResult: { isFetching, data: { content: { product: { value: products = [] } = {} } = {} } = {} },
  } = useRecommendation((query) => {
    query.getRequest().setNumberProducts(productsToDisplay);
  });
  const ready = !isLoading && !isFetching && products.length > 0;

  return (
    <>
      <RecommendationContainer {...restProps}>
        {ready && (
          <>
            {title && <Header>{title}</Header>}
            <CarouselContainer onNavigationNext={onNavigationNext} onNavigationPrev={onNavigationPrev}>
              <SliderList>
                {products.map((p, index) => (
                  <Slide key={`slide-${index}`}>
                    <ProductCard
                      product={p}
                      key={`product-${index}`}
                      onProductClick={onProductClick}
                      className="productCart"
                      displayQuickView={displayQuickView}
                    />
                  </Slide>
                ))}
              </SliderList>

              <PrevButton aria-label="Show previous demo" tabIndex={-1}>
                <LeftIcon />
              </PrevButton>

              <NextButton aria-label="Show next demo" tabIndex={-1}>
                <RightIcon />
              </NextButton>
            </CarouselContainer>
          </>
        )}
      </RecommendationContainer>
    </>
  );
};

RecommendationCarousel.propTypes = {
  productsToDisplay: PropTypes.number,
  title: PropTypes.string,
  displayQuickView: PropTypes.bool,
};

RecommendationCarousel.defaultProps = {
  title: '',
  productsToDisplay: 6,
  displayQuickView: true,
};
const RecommendationCarouselWidget = widget(RecommendationCarousel, WidgetDataType.RECOMMENDATION);
export const RecommendationCarouselSkuContextWidget = skuContextWidget(
  RecommendationCarousel,
  WidgetDataType.RECOMMENDATION,
);
export default RecommendationCarouselWidget;
