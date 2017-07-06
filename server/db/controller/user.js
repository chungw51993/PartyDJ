var models = require('../index');

module.exports = {

  newUser: function(uid, email, name) {
    return models.user.findOrCreate({ where: { spotify_id: uid }, defaults: { email: email, name: name }});
  }

};