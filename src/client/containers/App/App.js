import React from 'react';
import { Heading, Button, TextInput } from 'grommet';
import './App.scss';

const App = () => (
  <div className="app-wrapper">
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
    <main className="main-content">
      <Heading className="title" margin="large">hz Pictionary</Heading>
      <div className="room-form">
        <TextInput />
        <Button
          className="room-form__button"
          label="Create room"
          onClick={() => null}
          primary disabled
        />
      </div>
    </main>
  </div>
);

export default App;
