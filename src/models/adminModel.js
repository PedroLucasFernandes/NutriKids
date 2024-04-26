//os arquivos de models geralmente são 'mais próximos' do banco de dados, definindo diretamente como as operações básicas de CRUD são executadas. geralmente, não há muita lógica de negócios aqui, apenas a lógica necessária para interagir diretamente com o banco de dados.

const pool = require('../config/database.js');

const adminModel = {
    //criando o objeto admin
    async getAdminByUsername(username) {
        const query = `SELECT * FROM admin WHERE login = $1`;
        //criando a query que será executada no banco de dados. $1 é um placeholder que será substituído pelo, no caso, único valor do array values abaixo.
        //CORRIGINDO: o responsável pelo DB usou 'login' ao invés de 'username', por isso troquei na query (acho que só trocar aqui é suficiente, não preciso trocar em todas as camadas não. justamente por isso que é mais fácil de fazer a manutenção de API que é dividida em camada, né?) (ATT. na verdade tive que trocar também em uma parte do controller, em todos os momentos que tenho de recorrer ao foundAdmin (achado na tabela) e o seu login (já que na tabela está login e não username), então ficou, ao invés de 'foundAdmin.username', 'foundAdmin.login').
        const values = [username];

        try {
            const { rows } = await pool.query(query, values);
            //executando a query no banco de dados e armazenando o resultado em rows. rows é uma desestruturação do objeto retornado por pool.query, que é um objeto com duas propriedades: rows e rowCount. rows em si é um array de objetos, onde cada objeto é uma linha da tabela do banco de dados.
            //pool.query é um método do pool que executa a query no banco de dados. query é o primeiro parâmetro e values é o segundo parâmetro (e deve ser um array).
            if (rows.length === 0) {
                throw new Error(`camada model: nenhum administrador encontrado com o usuário ${username} no banco de dados`);
                //aqui, optei por usar somente o throw new Error e não console.error e throw new Error, para não ficar redundante/repetitivo, pois no catch eu já tenho um console.error e throw error que faz essa função. 
                //throw new Error interrompe a execução do código, desviando para o bloco catch mais próximo e cria uma instância de erro que tem uma propriedade message contendo a mensagem de erro. nesse caso, o error.message é a própria mensagem de erro que foi passada no throw new Error (criado por mim, afinal, é um erro proveniente de uma condição que eu determinei).
            }
            return rows[0];
            //CORRIGINDO: retornando o primeiro elemento do array rows, senão, ele será um array e não um objeto e lá na frente ele não conseguirá comparar o password.
        } catch (error) {
            //esse error capturado nesse catch é o mesmo que é passado no throw new Error acima, ou seja, a mensagem de erro gerada pelo banco de dados que está dentro do throw new Error acima.
            console.error(`${error.message}`);
            //console.error registra informações detalhadas sobre o contexto de um erro em logs. nesse caso, ele está registrando o erro que foi capturado no catch e como esse erro foi criado por mim, ele já vem com uma mensagem de erro que eu determinei, o que já determina um contexto adicional para o erro.
            throw error;
            //esse throw error será capturado no próximo catch, que, nesse caso, é o catch do repository que chama essa função.
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
        //criando o método createAdmin
        const query = `INSERT INTO admin (name, login, password, created_by, updated_by) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        //criando a query que será executada no banco de dados. $1, $2, $3, $4 e $5 são placeholders que serão substituídos pelos valores do array values.
        const values = [name, username, password, created_by, updated_by];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
            //retornando o resultado da query (que é o primeiro elemento do array rows).
        } catch (error) {
            console.error(`${error.message}: erro ao criar administrador com o usuário ${username} no banco de dados`);
            //aqui, error.message vai mostrar qual mensagem já que não tem throw new Error nesse try-catch? não tem throw new Error no try-catch, mas o próprio banco de dados vai se encarregar de gerar um erro, caso algo dê errado. então, o error.message vai mostrar a mensagem de erro gerada pelo banco de dados.
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