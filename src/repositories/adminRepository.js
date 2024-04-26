//os arquivos de repositories servem como um intermediário mais "inteligente" que usa um ou mais models para executar operações mais complexas. ele pode manipular e combinar dados de várias fontes de modelo e é onde você colocaria lógica que não é específica de um modelo mas ainda relacionada a dados, como transações ou operações que envolvem múltiplas etapas de dados.

const adminModel = require('../models/adminModel.js');
//importando o módulo adminModel, com as operações de CRUD para a tabela admin.

const adminRepository = {
  //criando o objeto adminRepository
  async getAdminByUsername(username) {
    try {
      return await adminModel.getAdminByUsername(username);
      //retornando a execução do método getAdminByUsername do adminModel, passando username como argumento.
      //caso essa operação não dê certo no adminModel, o erro lançado lá será capturado no catch abaixo.
      //como, nesse caso, aqui no repository não há nenhuma lógica nova, só estamos chamando o método do model, não há necessidade de fazer um tratamento de erro específico, então, não há um throw new Error aqui.
    } catch (error) {
      throw error;
      //propaga o erro para ser tratado pela camada superior (que, nesse caso, é o service correspondente)
    }
  },

  async getAllAdmins() {
    try {
      return await adminModel.getAllAdmins();
    } catch (error) {
      throw error;
    }
  },

  async getAdminById(id) {
    try {
      return await adminModel.getAdminById(id);
    } catch (error) {
      throw error;
    }
  }
};



module.exports = adminRepository;

