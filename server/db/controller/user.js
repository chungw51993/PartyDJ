var models = require('../index');

module.exports = {

  newUser: function(user) {
    return models.user.findOrCreate(user);
  }

};