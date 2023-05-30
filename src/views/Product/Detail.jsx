import React from 'react';
import { useLocation } from 'react-router-dom';

import { PAGE_EVENTS_PDP } from '../../helpers/constants';
import withPageTracking from '../../hocs/withPageTracking';
import CustomPageWidgets from '../../widgets/CustomPageWidgets';
import ProductDetails from '../../widgets/ProductDetails';

const ProductDetailView = () => {
  const { pathname } = useLocation();

  return (
    <div className="container mt-3 mb-5">
      <div className="row mb-5">
        {/** This component was done for demo proposal. Product Detail Page looks should be handled by the SDK consumer. Sitecore Discover Services are used to search and recommend. */}
        <ProductDetails rfkId="pdp" key={pathname} />
      </div>

      {/** Renders all the widgets included in a hosted page configured on CEC panel for the current url in a custom way */}
      <CustomPageWidgets />
    </div>
  );
};

export default withPageTracking(ProductDetailView, PAGE_EVENTS_PDP);
