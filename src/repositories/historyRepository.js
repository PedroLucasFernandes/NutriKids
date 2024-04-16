const historyModel = require('../models/historyModel.js');

const historyRepository = {
    async addNewHistory(title, story, created_by, updated_by) {
        try {
            const newHistory = await historyModel.createHistory(title, story, created_by, updated_by);
            return newHistory;
            //aqui tem que ter o return newHistory; para que o historyService.js possa retornar a nova história criada ao executar a API. se fosse direto 'await historyModel.createHistory(title, story, created_by, updated_by);' não seria possível retornar a nova história criada.
        } catch(error) {
            throw new Error(`erro ao adicionar nova história: ${error.message}`);
        }
    },
    
    async findHistory() {
        try {
            return await historyModel.getHistory();
        } catch(error) {
            throw new Error(`erro ao localizar histórias: ${error.message}`);
        }
    },

    async findHistoryById(id) {
        try {
            return await historyModel.getHistoryById(id);
        } catch(error) {
            throw new Error(`erro ao localizar história: ${error.message}`);
        }
    },

    async findHistoryByTitle(title) {
        try {
            return await historyModel.getHistoryByTitle(title);
        } catch(error) {
            throw new Error(`erro ao localizar história: ${error.message}`);
        }
    },

    async updateHistory(id, title, story, updated_by) {
        try {
            const updatedHistory = await historyModel.updateHistory(id, title, story, updated_by);
            return updatedHistory;
        } catch(error) {
            throw new Error(`erro ao atualizar história: ${error.message}`);
        }
    },

    async deleteHistory(id) {
        try {
            const deletedHistory = await historyModel.deleteHistory(id);
            return deletedHistory;
        } catch(error) {
            throw new Error(`erro ao deletar história: ${error.message}`);
        }
    }
};

module.exports = historyRepository;