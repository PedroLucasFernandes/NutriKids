const pool = require('../config/database.js');

const historyModel = {
    async createHistory(title, story, created_by, updated_by, banner) {
        const query = `INSERT INTO history (title, story, created_by, updated_by, image_path) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [title, story, created_by, updated_by, banner];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getHistory() {
        const query = `SELECT * FROM history`;

        try {
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getHistoryById(id) {
        const query = `SELECT * FROM history WHERE id = $1`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                throw new Error(`camada model: nenhuma história encontrada com o id ${id} no banco de dados`);
            }
            return rows[0];
        } catch(error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getHistoryByTitle(title) {
        const query = `SELECT * FROM history WHERE title = $1`;
        const values = [title];

        try {
            const { rows } = await pool.query(query, values);
            return rows.length === 0 ? null : rows[0];
        } catch(error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async updateHistory(id, title, story, updated_by, banner, comics) {
        const query = `UPDATE history SET title = $1, story = $2, updated_at = CURRENT_TIMESTAMP, updated_by = $3, image_path = $4 WHERE id = $5 RETURNING *`;
        const values = [title, story, updated_by, banner,  id];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async deleteHistory(id) {
        const query = `DELETE FROM history WHERE id = $1 RETURNING *`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                throw new Error(`nenhuma história encontrada com o id ${id} no banco de dados`);
            }
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    }
}

const comicModel = {
    async createComic(id_history, comic_order, filename) {
        const query = `INSERT INTO comic (id_history, comic_order, image_path) VALUES ($1, $2, $3) RETURNING *`;
        const values = [id_history, comic_order, filename];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getComicsByHistoryId(id_history) {
        const query = `SELECT * FROM comic WHERE id_history = $1 ORDER BY comic_order`;
        const values = [id_history];

        try {
            const { rows } = await pool.query(query, values);
            return rows;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async updateComic(id, comic_order, image_path) {
        const query = `UPDATE comic SET comic_order = $1, image_path = $2 WHERE id = $3 RETURNING *`;
        const values = [comic_order, image_path, id];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async deleteComic(id) {
        const query = `DELETE FROM comic WHERE id = $1 RETURNING *`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async deleteComicsByHistoryId(id_history) {
        const query = 'DELETE FROM comic WHERE id_history = $1';
        const values = [id_history];
    
        try {
            await pool.query(query, values);
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    }
}

module.exports = { historyModel, comicModel };