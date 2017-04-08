import React from 'react';
import { connect } from 'react-redux';
import { Headline } from 'grommet';
import Header from '../../components/Header';
import { logout, setUsername } from '../../redux/actions';
import ProfileForm from './ProfileForm';

const Profile = ({ user, logout, setUsername }) => (
  <div className="app-wrapper">
    <Header user={user} onLogout={logout} />
    <main className="main-content">
      <div className="login-container">
        <Headline size="small">{user.name}&#39;s Profile</Headline>
        <ProfileForm
          username={user.name}
          onSubmit={name => setUsername(name)}
        />
      </div>
    </main>
  </div>
);

export default connect(null, { logout, setUsername })(Profile);

