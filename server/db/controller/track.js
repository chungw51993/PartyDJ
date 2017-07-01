var models = require('../index');

module.exports = {

  newTrack: function(artist, album, track, pid) {
    return models.artist.findOrCreate(artist)
      .then((artist) => {
        return models.album.findOrCreate(album);
      })
      .then((album) => {
        return models.track.findOrCreate(track);
      })
      .then((track) => {
        return models.playlist.find({ where: { id: pid }})
          .then((playlist) => {
            playlist.addTrack(track);
          });
      });
  },

  deleteTrack: function(tid, pid) {
    return models.track.find({ where: { id: tid }})
      .then((track) => {
        return models.playlist.find({ where: { id: pid }})
          .then((playlist) => {
            playlist.removeTrack(track);
          })
      })
  }

}