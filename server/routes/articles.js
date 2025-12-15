const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const {
  generate,
  getAll,
  getById,
  update,
  remove
} = require('../controllers/articleController');

// Todas as rotas requerem autenticação
router.use(authenticateToken);

router.post('/generate', generate);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;

