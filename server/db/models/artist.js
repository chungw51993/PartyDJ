module.exports = (sequelize, Sequelize) => {
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

  return Artist;
}