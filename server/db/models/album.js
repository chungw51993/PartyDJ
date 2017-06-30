module.exports = (sequelize, Sequelize) => {
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

  return Album;
}