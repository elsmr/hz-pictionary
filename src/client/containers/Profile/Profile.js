import React from 'react';
import { connect } from 'react-redux';
import { Heading } from 'grommet';
import Header from '../../components/Header';
import { logout } from '../../redux/actions';
import ProfileForm from './ProfileForm';

const Profile = ({ user, logout }) => (
  <div className="app-wrapper">
    <Header user={user} onLogout={logout} />
    <main className="main-content">
      <div className="login-container">
        <Heading>Set username</Heading>
        <ProfileForm username={user.name} />
      </div>
    </main>
  </div>
);

export default connect(null, { logout })(Profile);

