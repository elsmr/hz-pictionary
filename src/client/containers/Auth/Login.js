import React from 'react';
import { Button, Heading } from 'grommet';
import GithubIcon from 'grommet/components/icons/base/SocialGithub';
import Header from '../../components/Header/Header';
import { hz } from '../../lib/horizon';
import { AUTH_PROVIDERS } from '../../constants';
import './Login.scss';

const onLogin = () => {
  hz.authEndpoint(AUTH_PROVIDERS.GITHUB)
    .subscribe((endpoint) => {
      window.location.replace(endpoint);
    });
};

const Login = ({ user }) => (
  <div className="app-wrapper">
    <Header user={user} />
    <main className="main-content">
      <div className="login-container">
        <Heading className="title" margin="large">hzPictionary</Heading>
        <Button
          icon={<GithubIcon />}
          label="Login with Github"
          fill
          style={{ width: 'initial', alignSelf: 'center' }}
          onClick={e => onLogin(e)}
        />
      </div>
    </main>
  </div>
);

export default Login;

