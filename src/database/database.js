const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
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
