import { PageController, trackPageViewEvent } from '@sitecore-discover/react';
import React, { useEffect } from 'react';
import { PAGE_EVENTS_DEFAULT } from '../helpers/constants';
import useUri from '../hooks/useUri';

export const PageEventContext = React.createContext();
/**
 * The page view event is handled in sitecore SDK, but for SPA it just happen on the first time.
 * So when user navigate is needed to track the page view event manually.
 * This is the purpouse of this hoc, set page uri and track the page view event
 */
const withPageTracking =
  (Component, pageType = PAGE_EVENTS_DEFAULT) =>
  (props) => {
    const uri = useUri();

    useEffect(() => {
      PageController.getContext().setPageUri(uri);
      trackPageViewEvent(PageController.getContext().toJson());
    }, [uri]);

    return (
      <PageEventContext.Provider value={pageType}>
        <Component {...{ props }} />
      </PageEventContext.Provider>
    );
  };

export default withPageTracking;
