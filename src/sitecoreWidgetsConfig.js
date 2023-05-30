// Set initial widget configuration to can be used when render WidgetsContainer or use the combination of usePageWidgets hook and generic widget

import { setWidget, setWidgetType, WidgetDataType } from '@sitecore-discover/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { lazily } from 'react-lazily';
import ProductDetails from './widgets/ProductDetails';

// Get components to be used on `setWidgetType` or `setWidget` config functions
const { Recommendation } = lazily(() => import('./widgets/BasicRecommendation'));
const { RecommendationCarousel } = lazily(() => import('./widgets/CarouselRecommendation'));
const { FrequentlyBoughtTogetherRecommendation } = lazily(
  () => import('./widgets/FrequentlyBoughtTogetherRecommendation'),
);
const { SearchResults } = lazily(() => import('./widgets/SearchResults'));
const { SearchQueryResults } = lazily(() => import('./widgets/SearchResults'));

/** ************************************************* */
/** * RECOMMENDATION CONFIGURATION * */
/** ************************************************* */

// Recommendation: Default widget setting
setWidgetType(WidgetDataType.RECOMMENDATION, {
  component: Recommendation,
  options: {
    props: {
      title: 'Recommendations',
      productsToDisplay: 12,
    },
  },
});

/** ************************************************* */

/** ************************************************* */
/** * RECOMMENDATION CONFIGURATION - HOME PAGE  *   */
/** ************************************************* */
// Config widgets by rfkid
setWidget('rfkid_2', {
  options: {
    props: {
      title: 'Popular Products',
    },
  },
});

setWidget('rfkid_3', {
  component: Recommendation,
  options: {
    props: {
      title: 'Recently Viewed',
      productsToDisplay: 6,
    },
  },
});

/** ************************************************** */
/** * RECOMMENDATION CONFIGURATION - CATEGORY PAGE * */
/** ************************************************** */
// Config widgets by rfkid
setWidget('rfk_category_top_revenue', {
  component: Recommendation,
  options: {
    props: {
      title: 'Category Top Products',
      productsToDisplay: 5,
    },
  },
});

/** ************************************************** */
/** * RECOMMENDATION CONFIGURATION - DETAILS PAGE *  */
/** ************************************************** */
// Config widgets by rfkid
setWidget('pdp_frequently_bought', {
  component: FrequentlyBoughtTogetherRecommendation,
});

setWidget('rfkid_34', {
  options: {
    props: {
      title: 'Complete de Look',
    },
  },
});

setWidget('rfkid_33', {
  options: {
    props: {
      title: 'Customer Also Purchased',
    },
  },
});

setWidget('rfkid_32', {
  options: {
    props: {
      title: 'You May Also Like',
    },
  },
});

/** ************************************************** */
/** * RECOMMENDATION CONFIGURATION - CART PAGE *     */
/** ************************************************** */
// Config widgets by rfkid
setWidget('rfkid_11', {
  options: {
    props: {
      title: 'You may also like',
    },
  },
});

/** ************************************************** */
/** * RECOMMENDATION CONFIGURATION - ORDER PAGE *    */
/** ************************************************** */
// Config widgets by rfkid
setWidget('rfkid_21', {
  component: RecommendationCarousel,
  options: {
    props: {
      title: 'Recently Purchased together',
    },
  },
});

/** ************************************************** */
/** * RECOMMENDATION CONFIGURATION - NO RESULT PAGE  */
/** ************************************************** */
// Config widgets by rfkid
setWidget('rfkid_41', {
  options: {
    props: {
      title: 'Trending',
    },
  },
});

/** ************************************************** */
/** * RECOMMENDATION CONFIGURATION - PDP  */
/** ************************************************** */
// Config widgets by rfkid
setWidget('pdp', {
  type: WidgetDataType.RECOMMENDATION,
  component: ProductDetails,
});

/** ************************************************** */
/** * RECOMMENDATION CONFIGURATION - NOT FOUND PAGE  */
/** ************************************************** */
// Config widgets by rfkid
setWidget('rfkid_51', {
  options: {
    props: {
      title: 'Trending',
    },
  },
});

/** ************************************************** */
/**     * SEARCH RESULT CONFIGURATION *              */
/** ************************************************** */
// Search Results: Default widget setting
// Category page use this
setWidgetType(WidgetDataType.SEARCH_RESULTS, {
  component: SearchResults,
});

// Search Results: Config widgets by rfkid
// search result page use this widget
setWidget('rfkid_7', {
  component: SearchQueryResults,
});
