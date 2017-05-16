import React from 'react';
import { Button } from 'grommet';
import UserIcon from 'grommet/components/icons/base/User';
import LogoutIcon from 'grommet/components/icons/base/Logout';

const ProfileControls = ({ username, onLogout }) => (
  <div>
    <Button
      label={username}
      icon={<UserIcon />}
      path="/profile"
      primary
    />
    <Button
      label="Logout"
      icon={<LogoutIcon />}
      onClick={() => onLogout()}
    />
  </div>
);

export default ProfileControls;
