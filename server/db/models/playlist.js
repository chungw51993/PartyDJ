module.exports = (sequelize, Sequelize) => {
  const Playlist = sequelize.define('Playlist', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.STRING
    }
  });

  return Playlist;
};