const pool = require('../config/database.js');

const historyModel = {
    async createHistory(title, story, created_by, updated_by, banner) {
        const query = `INSERT INTO history (title, story, created_by, updated_by, image_path) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        //esse RETURNING * é para retornar o objeto criado, sem ele o return rows[0] não funcionaria, afinal o comando INSERT por si só não retorna as linhas inseridas a menos que você peça explicitamente por elas
        const values = [title, story, created_by, updated_by, banner];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`${error.message}`);
            //esse error.message, se for capturado aqui (caso algo dê errado na inserção da história), trará a mensagem de erro gerada pelo banco de dados.
            throw error;
            //esse throw error será capturado no catch do repository que chama essa função.
        }
    },

    async getHistory() {
        const query = `SELECT * FROM history`;

        try {
            const { rows } = await pool.query(query);
            return rows;
            //rows é um array de objetos, então, ele retornará todos os objetos, ou seja, todas as histórias.
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
            //aqui eu uso throw.error e não throw new Error, pois o erro gerado aqui é um erro do banco de dados, então, ele já vem com uma mensagem de erro que eu não preciso adicionar.
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
            //CORRIGINDO: aqui, o código anterior estava interpretando a inexistência de uma história como um erro, o que estava causando uma exceção que não deveria ocorrer nesse contexto, afinal, a inexistência de uma história com o título buscado não é um erro, é um resultado esperado. por isso, foi feita a correção para retornar null quando não houver nenhuma história com o título buscado. isso permitirá com que addNewHistory (em historyService.js) trate adequadamente a situação e adicione a história se ela não existir.
        } catch(error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async updateHistory(id, title, story, updated_by, file) {
        const query = `UPDATE history SET title = $1, story = $2, updated_by = $3, image_path = $4 WHERE id = $5 RETURNING *`;
        const values = [title, story, updated_by, file, id];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
            //return rows[0] retorna o objeto atualizado.
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
                throw new Error(`camada model: nenhuma história encontrada com o id ${id} no banco de dados`);
            }
            return rows[0];
            //return rows[0] retorna o objeto deletado.
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
          //aqui id é id do quadrinho (id_comic) e não id da história (id_history), pois como quero atualizar um quadrinho específico, eu preciso do id do quadrinho e não do id da história, senão atualizaria todos os quadrinhos da história.

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
    }
}

module.exports = { historyModel, comicModel };