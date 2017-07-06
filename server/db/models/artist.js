module.exports = (sequelize, Sequelize) => {
  const Artist = sequelize.define('Artist', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Artist;
};