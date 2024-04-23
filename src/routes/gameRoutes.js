const express = require('express');

const gameController = require('../controllers/gameController');

const router = express.Router();

router.get('/', gameController.findGame);
router.get('/:id', gameController.findGameById);

module.exports = router;