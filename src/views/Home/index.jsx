import React from 'react';
import { PAGE_EVENTS_HOME } from '../../helpers/constants';
import withPageTracking from '../../hocs/withPageTracking';
import RecommendationListWidget from '../../widgets/BasicRecommendationList';
import CustomPageWidgets from '../../widgets/CustomPageWidgets';

/**
 * This page shows the main page of the site.
 * CustomPageWidgets will render some content blocks and recommendations widgets configured for this page on CEC panel.
 * The other static recommendation widgets render here has been created in CEC panel with the configuration "WILL BE USED IN" set in "Common across all Pages" (hs_trending, hs_best_seller, hs_feature) to can be used in a hard code mode
 */
const Home = () => (
  <div>
    {/** Renders all the widgets included in a hosted page configured on CEC panel for the current url in a custom way */}
    <CustomPageWidgets className="mb-5" />

    <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-6">
            <RecommendationListWidget
              title="HOT TREND"
              rfkId="hs_trending"
              productsToDisplay={3}
              displayAddToCard
              displayQuickView
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <RecommendationListWidget
              title="BEST SELLER"
              rfkId="hs_best_seller"
              productsToDisplay={3}
              displayAddToCard
              displayQuickView
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <RecommendationListWidget
              title="FEATURE"
              rfkId="hs_feature"
              productsToDisplay={3}
              displayAddToCard
              displayQuickView
            />
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default withPageTracking(Home, PAGE_EVENTS_HOME);
