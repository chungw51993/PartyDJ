const models = require('../index');

module.exports = {

  newPlaylist: function(playlist) {
    return models.playlist.create(playlist);
  },

  findByUserId: function(uid) {
    return models.playlist.findAll({
      where: {
        user_id: uid
      },
      include: [
        {
          model: models.track,
          include: {
            model: models.album,
            include: [models.artist]
          }
        }
      ]
    });
  },


}
