const querystring = require('querystring');

exports.authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/landing');
};

exports.checkReturnTo = (req, res, next) => {
  var returnTo = req.headers.referer.split('/')[3];

  if (returnTo !== '') {
    req.session.returnTo = returnTo;
  }

  next();
};