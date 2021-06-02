const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'root', {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  timezone: '-03:00',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
  }
});

module.exports = sequelize;
