import React from 'react';
import { Button } from 'grommet';

const Header = () => (
  <div className="header">
    <div className="header__controls">
      <Button
        label="Sign in"
        onClick={() => null}
        primary
      />
      <Button
        label="Sign up"
        onClick={() => null}
      />
    </div>
  </div>
);

export default Header;
