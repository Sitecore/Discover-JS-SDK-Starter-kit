import { PageWidgets } from '@sitecore-discover/react';
import { ReactComponent as IconAlertTriangleFill } from 'bootstrap-icons/icons/exclamation-triangle-fill.svg';
import React from 'react';
import withPageTracking from '../../hocs/withPageTracking';
import useUri from '../../hooks/useUri';

const NotFoundView = () => {
  const uri = useUri();

  return (
    <div className="container text-center p-5">
      <div className="display-1">
        <IconAlertTriangleFill className="i-va text-warning" width={80} height={80} />
        404
      </div>
      <h1 className="mb-3">Oops... Page Not Found!</h1>
      <div className="row justify-content-md-center">
        <div className="col-md-12">
          <PageWidgets uri={uri} />
        </div>
      </div>
    </div>
  );
};

export default withPageTracking(NotFoundView);
