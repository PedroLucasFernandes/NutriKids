//os arquivos de services são onde a lógica de negócios é implementada. eles podem usar um ou mais repositórios para executar operações de banco de dados e podem conter lógica de negócios mais complexas. eles são responsáveis por orquestrar a lógica de negócios e garantir que as operações de banco de dados sejam executadas corretamente. eles servem como um ponto de comunicação entre os controllers (camada de apresentação) e a camada de persistência (repository e model).

const adminRepository = require('../repositories/adminRepository.js');

const adminService = {
    async toLocateAdminByUsername(username) {
        try {
            const foundAdmin = await adminRepository.findAdminByUsername(username);
            if(!foundAdmin) {
                throw new Error(`administrador não encontrado`);
            }
            return foundAdmin;
        } catch(error) {
            throw new Error(`erro ao localizar administrador pelo username: ${username} - ${error.message}`);
        }
    },

    async registerAdmin(name, username, password, created_by, updated_by) {
        try {
            const existingAdmin = await adminRepository.findAdminByUsername(username);
            if (existingAdmin) {
                throw new Error(`administrador com esse username já existe`);
            }

            const newAdmin = await adminRepository.addNewAdmin(name, username, password, created_by, updated_by);
            return newAdmin;
        } catch(error) {
            throw new Error(`erro ao tentar criar administrador com o username: ${username} - ${error.message}`);
        }        
    }
}

module.exports = adminService;