const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const request = require('request');
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
const redirect_uri = 'http://localhost:8000/api/user/callback';



module.exports = router;