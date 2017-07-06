module.exports = (sequelize, Sequelize) => {
  const Album = sequelize.define('Album', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    artist_id: {
      type: Sequelize.STRING
    }
  });

  return Album;
}