import { PageWidgets } from '@sitecore-discover/react';
import { ReactComponent as IconBugFill } from 'bootstrap-icons/icons/bug-fill.svg';
import React from 'react';
import withPageTracking from '../../hocs/withPageTracking';
import useUri from '../../hooks/useUri';

const InternalServerErrorView = () => {
  const uri = useUri();

  return (
    <div className="container text-center p-5">
      <div className="display-1">
        <IconBugFill className="i-va text-warning" width={80} height={80} />
        500
      </div>
      <h1 className="mb-3">Internal Server Error</h1>
      <div className="row justify-content-md-center">
        <div className="col-md-12">
          <PageWidgets uri={uri} />
        </div>
      </div>
    </div>
  );
};

export default withPageTracking(InternalServerErrorView);
