exports.authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

exports.checkReturnTo = (req, res, next) => {
  var returnTo = req.headers.referer.split('/')[3];

  if (returnTo !== '') {
    req.session.returnTo = returnTo;
  }

  next();
};