const pool = require('../config/database.js');

const adminModel = {
    async getAdminByUsername(username) {
        const query = `SELECT * FROM admin WHERE login = $1`;
        const values = [username];

        try {
            const { rows } = await pool.query(query, values);
            if (rows.length === 0) {
                throw new Error(`camada model: nenhum administrador encontrado com o usuário ${username} no banco de dados`);
            }
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getAllAdmins() {
        const query = `SELECT * FROM admin`;

        try {
            const { rows } = await pool.query(query);
            return rows;
        } catch (error) {
            console.error(`${error.message}: erro ao tentar buscar todos os administradores no banco de dados`);
            throw error;
        }
    },

    async getAdminById(id) {
        const query = `SELECT * FROM admin WHERE id = $1`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}: erro ao tentar buscar administrador com o id ${id} no banco de dados`);
            throw error;
        }
    },

    async createAdmin(name, username, password, created_by, updated_by) {
        const query = `INSERT INTO admin (name, login, password, created_by, updated_by) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [name, username, password, created_by, updated_by];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}: erro ao criar administrador com o usuário ${username} no banco de dados`);
            throw error;
        }
    },

    async updateAdmin(id, name, username, password, updated_by) {
        const query = `UPDATE admin SET name = $1, login = $2, password = $3, updated_by = $4 WHERE id = $5 RETURNING *`;
        const values = [name, username, password, updated_by, id];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}: erro ao tentar atualizar administrador com o id ${id} no banco de dados`);
            throw error;
        }
    },

    async deleteAdmin(id) {
        const query = `DELETE FROM admin WHERE id = $1`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}: erro ao tentar deletar administrador com o id ${id} no banco de dados`);
            throw error;
        }
    }
}

module.exports = adminModel;