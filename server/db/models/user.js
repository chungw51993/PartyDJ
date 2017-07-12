module.exports = (sequelize, Sequelize) => {
  /* eslint-disable */
  const User = sequelize.define('User', {
    spotify_id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true
    },
    email: {
      type: Sequelize.STRING
    },
    access_token: {
      type: Sequelize.STRING(1234)
    }
  });

  return User;
};