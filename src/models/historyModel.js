const pool = require('../config/database.js');

const historyModel = {
    async createHistory(title, story, created_by, updated_by) {
        const query = `INSERT INTO history (title, story, created_by, updated_by) VALUES ($1, $2, $3, $4) RETURNING *`;
        //esse RETURNING * é para retornar o objeto criado, sem ele o return rows[0] não funcionaria, afinal o comando INSERT por si só não retorna as linhas inseridas a menos que você peça explicitamente por elas
        const values = [title, story, created_by, updated_by];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`erro ao criar história`);
            throw new Error (`falha ao criar história`);
        }
    },

    async getHistory() {
        const query = `SELECT * FROM history`;

        try {
            const { rows } = await pool.query(query);
            return rows;
            //rows é um array de objetos, então, ele retornará todos os objetos, ou seja, todas as histórias.
        } catch (error) {
            console.error(`erro ao buscar histórias`);
            throw new Error (`falha ao buscar histórias`);
        }
    },

    async getHistoryById(id) {
        const query = `SELECT * FROM history WHERE id = $1`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                console.error(`nenhuma história encontrada com esse id: ${id}`);
                throw new Error('história não encontrada');
            }
            return rows[0];
        } catch(error) {
            console.error(`erro ao buscar história pelo id: ${id}`);
            throw new Error('falha ao buscar história');
        }
    },

    async getHistoryByTitle(title) {
        const query = `SELECT * FROM history WHERE title = $1`;
        const values = [title];

        try {
            const { rows } = await pool.query(query, values);
            return rows.length === 0 ? null : rows[0];
            //CORRIGINDO: aqui, o código anterior estava interpretando a inexistência de uma história como um erro, o que estava causando uma exceção que não deveria ocorrer nesse contexto, afinal, a inexistência de uma história com o título buscado não é um erro, é um resultado esperado. por isso, foi feita a correção para retornar null quando não houver nenhuma história com o título buscado. isso permitirá com que addNewHistory (em historyService.js) trate adequadamente a situação e adicione a história se ela não existir.
        } catch(error) {
            console.error(`erro ao buscar história pelo título: ${title}`);
            throw new Error('falha ao buscar história');
        }
    },

    async updateHistory(id, title, story, updated_by) {
        const query = `UPDATE history SET title = $1, story = $2, updated_by = $3 WHERE id = $4 RETURNING *`;
        const values = [title, story, updated_by, id];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
            //return rows[0] retorna o objeto atualizado.
        } catch (error) {
            console.error(`erro ao atualizar história`);
            throw new Error(`falha ao atualizar história`);
        }
    },

    async deleteHistory(id) {
        const query = `DELETE FROM history WHERE id = $1 RETURNING *`;
        const values = [id];

        try {
            const { rows } = await pool.query(query, values);
            if(rows.length === 0) {
                console.error(`nenhuma história encontrada com esse id: ${id}`);
                throw new Error('história não encontrada');
            }
            return rows[0];
            //return rows[0] retorna o objeto deletado.
        } catch (error) {
            console.error(`erro ao deletar história pelo id: ${id}`);
            throw new Error(`falha ao deletar história`);
        }
    }
}

module.exports = historyModel;