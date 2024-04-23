const gameModel = require('../models/gameModel.js');

const gameRepository = {
    async findGame() {
        try {
            return await gameModel.getGame();
        } catch(error) {
            throw error;
        }
    },

    async findGameById(id) {
        try {
            return await gameModel.getGameById(id);
        } catch(error) {
            throw error;
        }
    }
};

module.exports = gameRepository;