import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ render, isAuthorized, redirectUrl, ...otherProps }) => (
  <Route
    {...otherProps}
    render={isAuthorized ?
      render
      : (
        props =>
          <Redirect
            to={{ pathname: redirectUrl, state: { from: props.location } }}
          />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  isAuthorized: React.PropTypes.bool.isRequired,
  redirectUrl: React.PropTypes.string.isRequired,
};

export default ProtectedRoute;
