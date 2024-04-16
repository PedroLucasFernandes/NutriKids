//os arquivos de repositories servem como um intermediário mais "inteligente" que usa um ou mais models para executar operações mais complexas. ele pode manipular e combinar dados de várias fontes de modelo e é onde você colocaria lógica que não é específica de um modelo mas ainda relacionada a dados, como transações ou operações que envolvem múltiplas etapas de dados.

const adminModel = require('../models/adminModel.js');
//importando o módulo adminModel, com as operações de CRUD para a tabela admin.

const adminRepository = {
  //criando o objeto adminRepository
  async findAdminByUsername(username) {
    //criando o método findAdminByUsername que recebe username como parâmetro. ele executa o método getAdminByUsername do adminModel, passando username como argumento.
    try {
      return await adminModel.getAdminByUsername(username);
    } catch (error) {
      throw new Error(`erro ao encontrar administrador pelo username: ${error.message}`); 
      //propaga o erro para ser tratado pela camada superior (que, nesse caso, é o service correspondente)
    }
  },

  async addNewAdmin(name, username, password, created_by, updated_by) {
    //criando o método addNewAdmin que recebe name, username, password, created_by, updated_by como parâmetros
    try {
      return await adminModel.createAdmin(name, username, password, created_by, updated_by);
      //retornando a execução do método createAdmin do adminModel, passando name, username, password, created_by, updated_by como argumentos.
    } catch(error) {
      throw new Error(`erro ao adicionar novo administrador: ${error.message}`);
    }
  }
};

//criando o objeto adminRepository com os métodos addNewAdmin e findAdminByUsername. o método addNewAdmin executa o método createAdmin do adminModel, passando name, username e password como argumentos. o método findAdminByUsername executa o método getAdminByUsername do adminModel, passando username como argumento. é um intermediário entre o controller e o model.

module.exports = adminRepository;
