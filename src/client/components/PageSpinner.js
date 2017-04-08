import React from 'react';
import Spinning from 'grommet/components/icons/Spinning';

const PageSpinner = ({ size } = { size: 'huge' }) => (
  <div className="app-wrapper">
    <div className="main-content">
      <Spinning size={size} />
    </div>
  </div>
);

export default PageSpinner;
