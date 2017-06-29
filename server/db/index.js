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
  }
})

Playlist.belongsTo(User, { foreignKey: 'user_id', targetKey: 'spotify_id' });
User.hasMany(Playlist);

