const models = require('../index');

module.exports = {

  newPlaylist: function(playlist) {
    return models.playlist.create(playlist);
  },

  findByUserId: function(uid) {
    return models.playlist.findAll({ where: { user_id: uid }});
  },

  updatePlaylist: function(id, title) {
    return models.playlist.update({ name: title }, { where: { id: id }});
  },

  getAllTracks: function(id) {
    return models.playlist.findAll({
      where: {
        id: id
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

  deletePlaylist: function(id) {
    return models.playlist.destroy({ where: { id: id }});
  }
}
