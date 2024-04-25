//os arquivos de services são onde a lógica de negócios é implementada. eles podem usar um ou mais repositórios para executar operações de banco de dados e podem conter lógica de negócios mais complexas. eles são responsáveis por orquestrar a lógica de negócios e garantir que as operações de banco de dados sejam executadas corretamente. eles servem como um ponto de comunicação entre os controllers (camada de apresentação) e a camada de persistência (repository e model).

const adminRepository = require('../repositories/adminRepository.js');

const adminService = {
    async getAdminByUsername(username) {
        try {
            return await adminRepository.getAdminByUsername(username);
        } catch(error) {
            throw error;
        }
    },

    async getAllAdmins() {
        try {
            return await adminRepository.getAllAdmins();
        } catch(error) {
            throw error;
        }
    },

    async getAdminById(id) {
        try {
            return await adminRepository.getAdminById(id);
        } catch(error) {
            throw error;
        }
    }
}

module.exports = adminService;