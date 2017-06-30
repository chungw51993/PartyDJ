const Sequelize = require('sequelize');

const sequelize = new Sequelize('partyDJ', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

sequelize.authenticate().complete((err) => {
  if (err) {
    console.error('There is ERROR in connecting to database');
  } else {
    console.log('Connection to database has been established');
  }
});

const User = sequelize.define('User', {
  spotify_id: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true
  },
  email: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  }
});

const Playlist = sequelize.define('Playlist', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  user_id: {
    type: Sequelize.STRING
  }
});

Playlist.belongsTo(User, { foreignKey: 'user_id', targetKey: 'spotify_id' });
User.hasMany(Playlist, { foreignKey: 'user_id', sourceKey: 'spotify_id' });

const Track = sequelize.define('Track', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  uri: {
    type: Sequelize.STRING,
    unique: true
  },
  album_id: {
    type: Sequelize.INTEGER
  }
});

Track.belongsToMany(Playlist, { through: 'Playlist_Track' });
Playlist.belongsToMany(Track, { through: 'Playlist_Track' });

const Album = sequelize.define('Album', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  },
  artist_id: {
    type: Sequelize.INTEGER
  }
});

Track.belongsTo(Album, { foreignKey: 'album_id', targetKey: 'id' });
Album.hasMany(Track, { foreignKey: 'album_id', sourceKey: 'id' });

const Artist = sequelize.define('Artist', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  }
});

Album.belongsTo(Artist, { foreignKey: 'artist_id', targetKey: 'id' });
Artist.hasMany(Album, { foreignKey: 'artist_id', targetKey: 'id' });

User.sync();
Artist.sync();
Album.sync();
Track.sync();
Playlist.sync();

module.exports = {
  User: User,
  Playlist: Playlist,
  Track: Track,
  Artist: Artist,
  Album: Album
  sequelize: sequelize
}