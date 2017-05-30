# Pictionary

> A horizon.io pictionary game

This project requires a running RethinkDB server. Follow the steps on the official [docs](https://rethinkdb.com/docs/install/).

## Installing dependencies

```shell
npm install # or yarn
```

## Configuration

### Install horizon-cli

```shell
npm install -g horizon
```

### Generate certificates

```
hz create-cert
mv horizon-key.pem horizon-cert.pem ./config/tls/
```
### Setup secrets and OAuth

Create .hz/secrets.toml with contents:

```toml
token_secret = "randombase64stringhere"

[auth.github]
id = "your_client_id"
secret = "your_client_secret"
```

Create config/secrets.js with the same secrets, for example:

```js
module.exports = {
  token_secret: "randombase64stringhere",
  github: {
    id: "your_client_id",
    secret: "your_client_secret",
  }
}
```

## Run app locally

```shell
npm start # or yarn start
```
