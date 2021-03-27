const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const userRoutes = require('./app/controllers/authController');
const projectRoutes = require('./app/controllers/principalController');
const sequelize = require('./database/database');
const Movimentacao = require('./app/models/movimentacao');
const Usuario = require('./app/models/user');

const app = express();

const corsOptions = {
  origin: ['https://jymbo.netlify.app'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization', 'X-Request-With'],
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/principal', projectRoutes);
app.use('/auth', userRoutes);

// Um USUÁRIO pode ter uma ou mais movimentações
// Uma MOVIMENTAÇÃO pertence a somente um usuário
Movimentacao.belongsTo(Usuario, { constraints: true, onDelete: 'CASCADE' });
Usuario.hasMany(Movimentacao);


sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log('=================================================');
    console.log(err);
  });
