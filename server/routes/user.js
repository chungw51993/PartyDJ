const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const request = require('request');

const User = require('../db/controller/user');

module.exports = (passport) => {
  router.get('/login', passport.authenticate('spotify',
    {scope: ['user-read-email', 'user-read-private'],
      showDialog: true}),
    (req, res) => {
    });

  router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/landing'
  }), (req, res) => {
    res.redirect('/playlist');
  });

  return router;
};

