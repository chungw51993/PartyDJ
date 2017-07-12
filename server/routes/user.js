const express = require('express');
const router = express.Router();

const User = require('../db/controller/user');
const helper = require('../helper');

module.exports = (passport) => {
  router.get('/login', passport.authenticate('spotify',
    {scope: ['user-read-email', 'user-read-private'],
      showDialog: true}),
    (req, res) => {
    });

  router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/landing',
    successReturnToOrRedirect: '/playlist'
  }), (req, res) => {
    res.redirect('/playlist');
  });

  router.get('/authorized', helper.authenticated, (req, res) => {
    res.json(req.user);
  });

  return router;
};

