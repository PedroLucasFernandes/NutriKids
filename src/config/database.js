const { Pool } = require('pg');
//importando o Pool do pacote pg. o Pool é uma classe que cria uma pool de conexões com o banco de dados.

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
//criando uma nova instância de pool, passando um objeto com as configurações de conexão com o banco de dados.

module.exports = pool;
//exportando a instância de pool, para que a mesma instância seja utilizada nos arquivos que necessitam de conexão com o banco de dados.
