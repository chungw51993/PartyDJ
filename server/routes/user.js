const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const CLIENT = require('../config/config.js');

const generateRandomString = function(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const stateKey = 'spotify_auth_state';
const client_id = CLIENT.id;
const client_secret = CLIENT.secret;
const redirect_uri = 'http://localhost:8000';

router.get('/login', (req, res) => {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  let scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
})

module.exports = router;