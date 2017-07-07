var models = require('../index');

module.exports = {

  newUser: function(uid, email) {
    return models.user.findOrCreate({ where: { spotify_id: uid }, defaults: { email: email }});
  },

  findUserById: function(id) {
    return models.user.findById(id);
  }

};