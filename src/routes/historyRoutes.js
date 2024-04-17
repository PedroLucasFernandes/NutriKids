const express = require('express');

const historyController = require('../controllers/historyController');

const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/history', historyController.findHistory);
router.get('/history/:id', historyController.findHistoryById);

router.use(authMiddleware.verifyToken);
//aqui, o middleware de autenticação é aplicado a todas as rotas abaixo dele.

router.post('/history', historyController.addNewHistory);
router.put('/history/:id', historyController.updateHistory);
router.delete('/history/:id', historyController.deleteHistory);

module.exports = router;
