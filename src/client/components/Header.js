import React from 'react';
import { Button } from 'grommet';
import HomeIcon from 'grommet/components/icons/base/Home';
import ProfileControls from './ProfileControls';
import './Header.scss';

const Header = ({ isHome, user, onLogout }) => (
  <div className="header">
    { isHome ?
      (
        <div className="header__controls">
          { (!user.isAuthorized || user.authPending) ?
            (
              <span>
                <Button
                  label="Sign in"
                  onClick={() => null}
                  primary
                />
                <Button
                  label="Sign up"
                  onClick={() => null}
                />
              </span>
            ) : (
              <ProfileControls username={user.name} onLogout={onLogout} />
            )
          }
        </div>
      ) : (
        <div className="header__controls header__controls--single">
          <Button
            label="Home"
            icon={<HomeIcon />}
            onClick={() => null}
          />
          { user.isAuthorized &&
            <ProfileControls username={user.name} onLogout={onLogout} />
          }
        </div>
      )
    }
  </div>
);

export default Header;
