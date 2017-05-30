const express = require('express');
const horizon = require('@horizon/server');
const fs = require('fs');
const path = require('path');
const https = require('https');
const cors = require('cors');
const secrets = require('../../config/secrets');
const roomRoutes = require('./routes/rooms');
const authRoutes = require('./routes/auth');
const session = require('express-session');

const PROJECT_NAME = 'hz_pictionary';

const corsOptions = {
  origin: 'https://localhost:3000',
  optionsSuccessStatus: 200,
};

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, '../../config/tls/horizon-key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../../config/tls/horizon-cert.pem')),
};

const hzOptions = {
  project_name: PROJECT_NAME,
  permissions: true,
  auto_create_index: true,
  auth: {
    token_secret: secrets.token_secret,
  },
};

const PORT = process.env.PORT || 8181;

const app = express();
app.use(cors(corsOptions));
app.use(session({
  secret: secrets.token_secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

const httpsServer = https.createServer(httpsOptions, app);
app.use('/api/rooms', roomRoutes);
app.use('/auth/', authRoutes);
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build/index.html'));
});

const hzServer = horizon(httpsServer, hzOptions);
hzServer.add_auth_provider(horizon.auth.github, {
  path: 'github',
  id: secrets.github.id,
  secret: secrets.github.secret,
});

hzServer._reql_conn.ready().then((conn) => {
  app.rdbConnection = conn;
  app.hz = horizon;
  horizon.r.tableCreate('hz_users', { primaryKey: 'login' }).run(conn.connection())
    .catch(() => {});
  httpsServer.listen(PORT);
  console.log(`Server is listening on https://localhost:${PORT}`);
});
