var models = require('../index');

module.exports = {

  newUser: function(uid, email, token) {
    return models.user.create({ spotify_id: uid, email: email, access_token: token });
  },

  findUserById: function(id) {
    return models.user.findById(id);
  }

};