const gameService = require("../services/gameService");

const gameController = {
    async findGame(req, res) {
        try {
            const allGame = await gameService.findAllGames();
            res.status(200).json(allGame);
        } catch(error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar localizar jogos' });
        }
    },

    async findGameById(req, res) {
        const { id } = req.params;

        try {
            const foundGame = await gameService.findGameById(id);
            res.status(200).json(foundGame);
        } catch(error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar localizar jogo' });
        }
    }
}

module.exports = gameController;