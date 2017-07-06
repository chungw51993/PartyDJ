module.exports = (sequelize, Sequelize) => {
  const Track = sequelize.define('Track', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    },
    uri: {
      type: Sequelize.STRING,
      unique: true
    },
    album_id: {
      type: Sequelize.STRING
    }
  });

  return Track;
};