var models = require('../index');

module.exports = {

  newTrack: function(artist, album, track, pid) {
        console.log('>>>>>>>>>>>>>>>>', artist);
    return models.artist.findOrCreate({ where: { id: artist.id }, defaults: { name: artist.name }})
      .then((artist) => {
        return models.album.findOrCreate({ where: { id: album.id }, defaults: { name: album.name, image: album.image, artist_id: artist[0].id }});
      })
      .then((album) => {
        return models.track.findOrCreate({ where: { id: track.id }, defaults: { name: track.name, uri: track.uri, album_id: album[0].id }});
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