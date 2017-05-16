import React from 'react';
import { connect } from 'react-redux';
import { Heading, Notification } from 'grommet';
import RoomForm from './RoomForm';
import Header from '../../components/Header/Header';
import { createRoom, logout } from '../../redux/actions';
import './Home.scss';

const Home = ({ user, createRoom, logout }) => (
  <div className="home-wrapper">
    <Header isHome user={user} onLogout={logout} />
    <main className="main-content">
      <Heading className="title" margin="large">hzPictionary</Heading>
      <RoomForm
        disabled={!user.isAuthorized}
        onSubmit={n => createRoom(n, user)}
      />
    </main>
    { !user.isAuthorized && !user.authPending &&
      <Notification
        status="warning"
        message="You need to login or sign up to create a hzPictionary room!"
      />
    }
  </div>
);

export default connect(null, { createRoom, logout })(Home);

