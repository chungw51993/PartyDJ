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
  artist_id: {
    type: Sequelize.INTEGER
  }
});

Track.belongsToMany(Playlist, { through: 'Playlist_Track' });
Playlist.belongsToMany(Track, { through: 'Playlist_Track' });

const Artist = sequelize.define('Artist', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  }
})

Track.belongsTo(Artist, { foreignKey: 'artist_id', targetKey: 'id'});
Artist.hasMany(Track, { foreignKey: 'artist_id', sourceKey: 'id'});