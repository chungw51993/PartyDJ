module.exports = (sequelize, Sequelize) => {
  /* eslint-disable */
  const Playlist = sequelize.define('Playlist', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
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