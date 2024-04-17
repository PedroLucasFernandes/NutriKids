//os arquivos de services são onde a lógica de negócios é implementada. eles podem usar um ou mais repositórios para executar operações de banco de dados e podem conter lógica de negócios mais complexas. eles são responsáveis por orquestrar a lógica de negócios e garantir que as operações de banco de dados sejam executadas corretamente. eles servem como um ponto de comunicação entre os controllers (camada de apresentação) e a camada de persistência (repository e model).

const adminRepository = require('../repositories/adminRepository.js');

const adminService = {
    async toLocateAdminByUsername(username) {
        try {
            return await adminRepository.findAdminByUsername(username);
        } catch(error) {
            throw error;
        }
    },

    async registerAdmin(name, username, password, created_by, updated_by) {
        try {
            const existingAdmin = await adminRepository.findAdminByUsername(username);
            if (existingAdmin) {
                throw new Error(`camada service: administrador com o usuário ${username} já existe`);
            }

            const newAdmin = await adminRepository.addNewAdmin(name, username, password, created_by, updated_by);
            return newAdmin;
        } catch(error) {
            console.error(`${error.message}`);
            //aqui, o erro capturado pode ser tanto o erro criado por mim, caso o administrador já exista, quanto o erro gerado pelo banco de dados, caso algo dê errado na inserção do novo administrador. será ou um ou outro, nunca os dois, afinal, se o administrador já existir, o código já será interrompido e o erro gerado pelo banco de dados não será capturado.
            throw error;
            //seja lá qual for o erro, ele será capturado no catch do controller que chama essa função.
        }        
    }
}

module.exports = adminService;