const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('../db/controller/user');
const CLIENT = require('../config/config');

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user[0].spotify_id);
  });

  passport.deserializeUser((id, done) => {
    User.findUserById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });

  passport.use(new SpotifyStrategy({
    clientID: CLIENT.id,
    clientSecret: CLIENT.secret,
    callbackURL: 'http://localhost:8000/api/user/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      console.log('PROFILEPFORIODJFO', profile);
      User.newUser(profile.id, profile.email)
        .then((user) => {
          if (!user) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
        .catch((err) => {
          console.error(err);
          done(err);
        });
    });
  }));

};