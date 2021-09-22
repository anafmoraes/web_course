const express = require('express');
const router = express.Router();
const controller = require('../controllers/product');

router.post('/', controller.post);

router.get('/', controller.get);
router.get('/:id', controller.getById);

router.get('/categories/:category', controller.getByCategory);

router.put('/:id', controller.put);

router.delete('/:id', controller.delete);

// router.method pode repetir, o que difere é o caminho da rota e a função que é chamada. Dar exemplo de duas rotas delete. Uma exclui todas e outra exclui uma
// Não posso ter conflito de rotas. Exemplo de delete com caminho '/:id' ou com caminho '/:code

module.exports = router;
