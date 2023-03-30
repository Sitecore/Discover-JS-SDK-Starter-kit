import { PageWidgets } from '@sitecore-discover/react';
import React from 'react';
import { PAGE_EVENTS_CATEGORY } from '../../helpers/constants';
import withPageTracking from '../../hocs/withPageTracking';
import useUri from '../../hooks/useUri';

/*
 * To can render merchandising widgets like SearchResults or Recommendation, widget inizialization should be done using the function setWidget or setWidgetType as it is done in `sitecoreWidgetsConfig.js` file.
 * @return renders a category page with all the widgets included in a hosted page configured on CEC panel using PageWidgets component.
 */
const CategoryView = () => {
  const uri = useUri();

  return <PageWidgets uri={uri} className="container" />;
};

export default withPageTracking(CategoryView, PAGE_EVENTS_CATEGORY);
