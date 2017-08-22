exports.authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

exports.checkReturnTo = (req, res, next) => {
  const returnTo = req.headers.referer.split('/')[3];

  if (returnTo !== '') {
    req.session.returnTo = returnTo;
  }

  next();
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  next();
};