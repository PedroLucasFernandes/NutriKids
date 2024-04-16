const express = require('express');

const historyController = require('../controllers/historyController');

const router = express.Router();

router.post('/history', historyController.addNewHistory);
router.get('/history', historyController.findHistory);
router.get('/history/:id', historyController.findHistoryById);
router.put('/history/:id', historyController.updateHistory);
router.delete('/history/:id', historyController.deleteHistory);

module.exports = router;
