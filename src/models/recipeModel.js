const pool = require('../config/database.js');
const { get } = require('../routes/historyRoutes.js');

const recipeModel = {
    async createRecipe(title, image_path, yield, ingredients, instructions, created_by, updated_by) {
        const query = `INSERT INTO recipe (title, image_path, yield, ingredients, instructions, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = [title, image_path, yield, ingredients, instructions, created_by, updated_by];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getRecipe() {
        const query = `SELECT * FROM recipe`;

        try {
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getRecipeById(id) {
        const query = `SELECT * FROM recipe WHERE id = $1`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                throw new Error(`nenhuma receita encontrada com o id ${id} no banco de dados`);
            }
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getRecipeByTitle(title) {
        const query = `SELECT * FROM recipe WHERE title = $1`;
        const values = [title];

        try {
            const { rows } = await pool.query(query, values);
            return rows.length === 0 ? null : rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async updateRecipe(id, title, image_path, yield, ingredients, instructions, updated_by) {
        const query = `UPDATE recipe SET title = $1, image_path = $2, yield = $3, ingredients = $4, instructions = $5, updated_at = CURRENT_TIMESTAMP, updated_by = $6 WHERE id = $7 RETURNING *`;
        const values = [title, image_path, yield, ingredients, instructions, updated_by, id];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                throw new Error(`nenhuma receita encontrada com o id ${id} no banco de dados`);
            }
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async deleteRecipe(id) {
        const query = `DELETE FROM recipe WHERE id = $1 RETURNING *`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                throw new Error(`nenhuma receita encontrada com o id ${id} no banco de dados`);
            }
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    }
}

module.exports = recipeModel;