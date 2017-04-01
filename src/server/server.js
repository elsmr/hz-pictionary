const express = require('express');
const horizon = require('@horizon/server');
const fs = require('fs');
const path = require('path');
const https = require('https');
const cors = require('cors');
const secrets = require('../../config/secrets');

const corsOptions = {
  origin: 'https://localhost:3000',
  optionsSuccessStatus: 200,
};

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, '../../config/tls/horizon-key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../../config/tls/horizon-cert.pem')),
};

const hzOptions = {
  project_name: 'hz_pictionary',
  permissions: true,
  auth: {
    token_secret: secrets.token_secret,
  },
};

const PORT = process.env.PORT || 8181;

const app = express();
app.use(cors(corsOptions));

const httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(PORT);
console.log(`Server is listening on https://localhost:${PORT}`);

const hzServer = horizon(httpsServer, hzOptions);
hzServer.add_auth_provider(horizon.auth.github, secrets.authProviders.github);
