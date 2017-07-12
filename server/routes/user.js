const express = require('express');
const router = express.Router();

const User = require('../db/controller/user');
const helper = require('../helper');

module.exports = (passport) => {
  router.get('/login', helper.checkReturnTo, passport.authenticate('spotify',
    {scope: ['user-read-email', 'user-read-private'],
      showDialog: true}),
    (req, res) => {
    });

  router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/landing',
  }), (req, res) => {
    if (req.session.returnTo) {
      const redirectUrl = `${req.protocol}://${req.get('host')}/${req.session.returnTo}`;
      res.redirect(redirectUrl);
    } else {
      res.redirect('/playlist');
    }
  });

  router.get('/authorized', helper.authenticated, (req, res) => {
    res.json(req.user);
  });

  return router;
};

