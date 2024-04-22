const pool = require('../config/database.js');

const quizModel = {
    async createQuiz(title, created_by, updated_by, banner) {
        const query = `INSERT INTO quiz (title, created_by, updated_by, image_path) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [title, created_by, updated_by, banner];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getQuiz() {
        const query = `SELECT * FROM quiz`;

        try {
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getQuizById(id) {
        const query = `SELECT * FROM quiz WHERE id = $1`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                throw new Error(`camada model: nenhum quiz encontrado com o id ${id}`);
            }
            return rows[0];
        } catch(error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getQuizByTitle(title) {
        const query = `SELECT * FROM quiz WHERE title = $1`;
        const values = [title];

        try {
            const { rows } = await pool.query(query, values);
            return rows.length === 0 ? null : rows[0];
        } catch(error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async updateQuiz(id, title, updated_by, banner) {
        const query = `UPDATE quiz SET title = $1, updated_at = CURRENT_TIMESTAMP, updated_by = $2, image_path = $3 WHERE id = $4 RETURNING *`;
        const values = [title, updated_by, banner, id];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async deleteQuiz(id) {
        const query = `DELETE FROM quiz WHERE id = $1 RETURNING *`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                throw new Error(`nenhum quiz encontrado com o id ${id}`);
            }
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    }
}

const questionModel = {
    async createQuestion(id_quiz, question_text, option_1, option_2, option_3, option_4, answer) {
        const query = `INSERT INTO question (id_quiz, question_text, option_1, option_2, option_3, option_4, answer) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = [id_quiz, question_text, option_1, option_2, option_3, option_4, answer];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getQuestionsByQuizId(id_quiz) {
        const query = `SELECT * FROM question WHERE id_quiz = $1`;
        const values = [id_quiz];

        try {
            const { rows } = await pool.query(query, values);
            return rows;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async deleteQuestion(id) {
        const query = `DELETE FROM question WHERE id = $1 RETURNING *`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async deleteQuestionsByQuizId(id_quiz) {
        const query = 'DELETE FROM question WHERE id_quiz = $1';
        const values = [id_quiz];
    
        try {
            await pool.query(query, values);
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    }
}

module.exports = { quizModel, questionModel };