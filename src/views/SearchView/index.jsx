import { PageWidgets } from '@sitecore-discover/react';
import React from 'react';
import { PAGE_EVENTS_SEARCH } from '../../helpers/constants';
import withPageTracking from '../../hocs/withPageTracking';
import useUri from '../../hooks/useUri';

const SearchView = () => {
  const uri = useUri();
  return <PageWidgets uri={uri} className="container" />;
};

export default withPageTracking(SearchView, PAGE_EVENTS_SEARCH);
