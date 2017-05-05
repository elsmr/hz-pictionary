import React from 'react';
import PropTypes from 'prop-types';
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
  isAuthorized: PropTypes.bool.isRequired,
  redirectUrl: PropTypes.string.isRequired,
};

export default ProtectedRoute;
