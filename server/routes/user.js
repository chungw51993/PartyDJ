const express = require('express');
const router = express.Router();

const User = require('../db/controller/user');
const authenticated = require('../helper');

module.exports = (passport) => {
  router.get('/login', passport.authenticate('spotify',
    {scope: ['user-read-email', 'user-read-private'],
      showDialog: true}),
    (req, res) => {
    });

  router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/landing'
  }), (req, res) => {
    console.log(req.headers, '<<<<<<<<<<<<<<<<<<<<<<');
    res.redirect('/playlist');
  });

  router.get('/authorized', authenticated, (req, res) => {
    res.json(req.user);
  });

  return router;
};

