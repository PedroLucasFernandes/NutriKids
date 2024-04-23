const gameRepository = require('../repositories/gameRepository.js');

const gameService = {
    async findAllGames() {
        try {
            const allGames = await gameRepository.findGame();

            return allGames;
        } catch(error) {
            console.error(`${error.message}`);
            throw error;
        }   
    },

    async findGameById(id) {
        try {
            const game = await gameRepository.findGameById(id);
            if(!game) {
                throw new Error(`camada service: nenhum quiz encontrado com o id ${id}`);
            }

            return game;
        } catch(error) {
            console.error(`${error.message}`);
            throw error;
        }
    }
}

module.exports = gameService;