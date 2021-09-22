// dada uma url, usuário chega até aplicação
const express = require('express');
const router = express.Router();

// criação da rota inicial
router.get('/', (req, res) => {
  res.status(200).send('Welcome to main route!');
});

module.exports = router;
