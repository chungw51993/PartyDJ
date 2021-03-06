const models = require('../index');
/* eslint-disable */
module.exports = {

  newPlaylist: function(playlist) {
    return models.playlist.create(playlist);
  },

  findByUserId: function(uid) {
    return models.playlist.findAll({
      where: { user_id: uid },
      order: [
        ['createdAt', 'DESC']
      ]});
  },

  updatePlaylist: function(id, title) {
    return models.playlist.update({ name: title }, { where: { id: id }});
  },

  getAllTracks: function(id) {
    return models.playlist.find({
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

};
