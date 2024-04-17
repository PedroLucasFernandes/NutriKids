//sim, esse arquivo é quase a mesma coisa que o historyRepository.js. a pequena diferença, nesse caso, é que ele aplica algumas lógicas de negócios, como impedir com que uma história com o mesmo nome que outra já existente seja cadastrada em um novo cadastro. DEPOIS VER: como fazer com que na atualização de um cadastro já existente, ele seja impedido de ser nomeado com um título de uma história que já existe (tirando ela mesma, obviamente)?).

const historyRepository = require('../repositories/historyRepository.js');

const historyService = {
    async addNewHistory(title, story, created_by, updated_by) {
        try {
            const existingHistoryTitle = await historyRepository.findHistoryByTitle(title);
            if(existingHistoryTitle) {
                throw new Error(`história com esse título já existe`);
            }
            
            const newHistory = await historyRepository.addNewHistory(title, story, created_by, updated_by);
             //aqui eu não coloco direto 'await historyRepository.addNewHistory(title, story, created_by, updated_by);' justamente porque eu quero retornar a nova história criada ao executar a API.
            return newHistory;
        } catch(error) {
            throw new Error(`erro ao tentar criar história com o seguinte título: ${title} - ${error.message}`);
        }
    },

    async findHistory() {
        try {
            const allHistory = await historyRepository.findHistory();
            return allHistory;
        } catch(error) {
            throw new Error(`erro ao localizar histórias: ${error.message}`);
        }
    },

    async findHistoryById(id) {
        try {
            return await historyRepository.findHistoryById(id);
        } catch(error) {
            throw new Error(`erro ao localizar história: ${error.message}`);
        }
    },

    async updateHistory(id, title, story, updated_by) {
        try {
            const updatedHistory = await historyRepository.updateHistory(id, title, story,  updated_by);
            return updatedHistory;
        } catch(error) {
            throw new Error(`erro ao tentar atualizar história com o seguinte novo título: ${title} - ${error.message}`);
        }
    },

    async deleteHistory(id) {
        try{
            return historyRepository.deleteHistory(id);
        } catch(error) {
            throw new Error(`erro ao deletar história: ${error.message}`);
        }
    }
}

module.exports = historyService;