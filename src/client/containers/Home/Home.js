import React from 'react';
import { Heading } from 'grommet';
import RoomForm from '../../components/RoomForm';
import Header from '../../components/Header';
import './Home.scss';

const Home = () => (
  <div className="app-wrapper">
    <Header />
    <main className="main-content">
      <Heading className="title" margin="large">hz Pictionary</Heading>
      <RoomForm
        onChange={e => e}
        onSubmit={e => e}
      />
    </main>
  </div>
);

export default Home;

