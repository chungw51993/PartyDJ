module.exports = (sequelize, Sequelize) => {
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

  return Track;
}