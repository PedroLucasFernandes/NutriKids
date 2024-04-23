const pool = require('../config/database.js');

const gameModel = {
    async getGame() {
        const query = `SELECT * FROM game`;

        try {
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getGameById(id) {
        const query = `SELECT * FROM game WHERE id = $1`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                throw new Error(`camada model: nenhum jogo encontrado com o id ${id}`);
            }
            return rows[0];
        } catch(error) {
            console.error(`${error.message}`);
            throw error;
        }
    }
}

module.exports = gameModel;