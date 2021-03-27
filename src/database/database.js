const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('d1ahq8km25276l', 'ilmthphzhgugpi', '5df426747370dcc611bc753cfbf7fa69138e9baa73a58238205c4e94743cd2d6', {
  dialect: 'postgresql',
  host: 'ec2-52-45-73-150.compute-1.amazonaws.com',
  dialectOptions: {
    ssl: true
  }
});

module.exports = sequelize;
