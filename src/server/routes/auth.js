const express = require('express');
const authService = require('../services/auth');
const simpleOAuth = require('simple-oauth2');
const providers = require('../../../config/secrets');
const crypto = require('crypto');
const base64url = require('base64url');
require('isomorphic-fetch');

const router = express.Router();

function getCredentials(provider) {
  const { id, secret, tokenHost, tokenPath, authorizePath } = providers[provider];
  return {
    client: { id, secret },
    auth: { tokenHost, tokenPath, authorizePath },
  };
}

router.post('/user/:token', (req, res) => {
  const token = req.params.token;
  authService.getUser(req.app.hz, req.app.rdbConnection, token)
    .then(res.json)
    .catch(err => res.status(404).send(err));
});

router.get('/login/:provider', (req, res) => {
  const provider = req.params.provider;
  const oauth2 = simpleOAuth.create(getCredentials(provider));
  const state = base64url(crypto.randomBytes(128));
  const session = req.session;
  session.state = state;

  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: `https://localhost:8181/auth/login/${provider}/callback`,
    scope: '',
    state,
  });
  res.redirect(authorizationUri);
});

router.get('/login/:provider/callback', (req, res) => {
  const { code, state } = req.query;
  const provider = req.params.provider;
  const errMessage = `Authentication with ${provider} failed`;
  const oauth2 = simpleOAuth.create(getCredentials(provider));

  if (state !== req.session.state) {
    res.redirect(`/?tokenErr=${errMessage}`);
  }

  oauth2.authorizationCode.getToken({ code })
    .then((token) => {
      const request = new Request('https://api.github.com/user', {
        headers: new Headers({
          authorization: `token ${token.access_token}`,
        }),
      });

      return Promise.all([fetch(request), Promise.resolve(token)]);
    })
    .then(([userRes, token]) => Promise.all([userRes.json(), Promise.resolve(token)]))
    .then(([userJson, token]) => Object.assign({}, userJson, { token: token.access_token }))
    .then((user) => {
      authService.storeUser(req.app.hz, req.app.rdbConnection, user);
      res.redirect(`/?token=${user.token}`);
    })
    .catch(() => {
      res.redirect(`/?tokenErr=${errMessage}`);
    });
});

module.exports = router;
