const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Movimentacao = require('../models/movimentacao');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models/movimentacao');

const router = express.Router();

router.use(authMiddleware);

router.get('/movimentacoes/:idMov', async (req, res) => {
  const idMov = req.params.idMov;
  try {
    const mov = await Movimentacao.findByPk(idMov);
    console.log(mov);
    res.send(mov);
  } catch (err) {
    throw err;
  }
});

// Buscar movimentações por mês
router.get('/:idUser/:dataAtual', async (req, res) => {
  console.log(req.params.dataAtual);
  const dataAtual = new Date(req.params.dataAtual);
  const mes = `${dataAtual.getMonth() + 1}`;
  const ano = `${dataAtual.getFullYear()}`;
  const query = `SELECT * FROM movimentacaos WHERE "usuarioId" = :idUsuario AND  EXTRACT(MONTH FROM data) = :mes AND EXTRACT(YEAR FROM data) = :ano`;
  const mov = await sequelize.query(query, { type: QueryTypes.SELECT, replacements: { idUsuario: req.params.idUser, mes: mes, ano: ano }});
  res.send(mov);
});

// Buscar todas as movimentações
router.get('/:idUser', async (req, res) => {
  const query = `SELECT * FROM movimentacaos WHERE "usuarioId" = :idUsuario`;
  const mov = await sequelize.query(query, { type: QueryTypes.SELECT, replacements: { idUsuario: req.params.idUser }});
  res.send(mov);
});

// Cadastrar movimentação
router.post('/cadastrar', async (req, res) => {
  const novaMovimentacao = req.body;
  try {
    const mov = await Movimentacao.create({
      tipo: novaMovimentacao.tipo,
      descricao: novaMovimentacao.descricao,
      valor: novaMovimentacao.valor,
      data: novaMovimentacao.data,
      usuarioId: novaMovimentacao.usuarioId
    })
    res.send(mov);
  } catch(err) {
    return res.status(400).send({ error: 'Erro ao tentar cadastrar movimentação.' });
  }
  
});

router.post('/alterarStatus', async (req, res) => {
  const newStatus = req.body.novoStatus;
  const movBody = req.body.movimentacao;

  const newMov = await Movimentacao.update({ status: newStatus}, {
    where: {
      id: movBody.id
    }
  })

  res.send(newMov);
});

router.delete('/:idMov', async (req, res) => {
  const idMov = req.params.idMov;
  try {
    await Movimentacao.destroy({ where: { id: idMov }});
    res.send(true);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
