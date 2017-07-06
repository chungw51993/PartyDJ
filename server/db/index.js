const Sequelize = require('sequelize');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
  connection.query('CREATE DATABASE IF NOT EXISTS partyDJ', (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Database created successfully');
  });
});

const sequelize = new Sequelize('partyDJ', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to database has been established');
  })
  .catch((err) => {
    console.error('There is ERROR in connecting to database');
  });

const User = require('./models/user')(sequelize, Sequelize);
const Playlist = require('./models/playlist')(sequelize, Sequelize);
const Track = require('./models/track')(sequelize, Sequelize);
const Album = require('./models/album')(sequelize, Sequelize);
const Artist = require('./models/artist')(sequelize, Sequelize);

Playlist.belongsTo(User, { foreignKey: 'user_id', targetKey: 'spotify_id' });
User.hasMany(Playlist, { foreignKey: 'user_id', sourceKey: 'spotify_id' });

Track.belongsToMany(Playlist, { through: 'Playlist_Track', foreignKey: 'track_id', constraints: false });
Playlist.belongsToMany(Track, { through: 'Playlist_Track', foreignKey: 'playlist_id', constraints: false });

Track.belongsTo(Album, { foreignKey: 'album_id', targetKey: 'id' });
Album.hasMany(Track, { foreignKey: 'album_id', sourceKey: 'id' });

Album.belongsTo(Artist, { foreignKey: 'artist_id', targetKey: 'id' });
Artist.hasMany(Album, { foreignKey: 'artist_id', targetKey: 'id' });

var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = User;
db.playlist = Playlist;
db.track = Track;
db.album = Album;
db.artist = Artist;

module.exports = db;