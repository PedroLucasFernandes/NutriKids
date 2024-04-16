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
                console.error(`nenhum administrador encontrado com esse usuário: ${username}`);
                //console.error registra informações detalhadas sobre o contexto de um erro em logs
                throw new Error('administrador não encontrado');
                //throw new Error cria uma instância de erro que tem uma propriedade message contendo a mensagem de erro e, também, interrompe a execução do código, desviando para o bloco catch mais próximo.
            }
            return rows[0];
            //CORRIGINDO: retornando o primeiro elemento do array rows, senão, ele será um array e não um objeto e lá na frente ele não conseguirá comparar o password.
        } catch (error) {
            console.error(`erro ao buscar administrador pelo username: ${username}`);
            throw new Error('falha ao buscar administrador');
        }
    },

    //essa função está aqui, mas ainda não a implementei no adminController.js
    async createAdmin(name, username, password, created_by, updated_by) {
        //criando o método createAdmin
        const query = `INSERT INTO admin (name, login, password, created_by, updated_by) VALUES ($1, $2, $3, $4, $5)`;
        //criando a query que será executada no banco de dados. $1, $2, $3, $4 e $5 são placeholders que serão substituídos pelos valores do array values.
        const values = [name, username, password, created_by, updated_by];

        try {
            const { rows } = await pool.query(query, values);
            return rows[0];
            //retornando o resultado da query (que é o primeiro elemento do array rows).
        } catch (error) {
            console.error(`erro ao criar administrador`);
            throw new Error (`falha ao criar administrador`);
        }
    }
}

module.exports = adminModel;