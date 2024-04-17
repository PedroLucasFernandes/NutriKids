const { historyModel, comicModel } = require('../models/historyAndComicModel.js');

const historyRepository = {
    async addNewHistory(title, story, created_by, updated_by, image_path) {
        try {
            const newHistory = await historyModel.createHistory(title, story, created_by, updated_by, image_path);
            return newHistory;
            //aqui tem que ter o return newHistory; para que o historyService.js possa retornar a nova história criada ao executar a API. se fosse direto 'await historyModel.createHistory(title, story, created_by, updated_by, image_path);' não seria possível retornar a nova história criada.
        } catch(error) {
            throw error;
        }
    },
    
    async findHistory() {
        try {
            return await historyModel.getHistory();
        } catch(error) {
            throw error;
        }
    },

    async findHistoryById(id) {
        try {
            return await historyModel.getHistoryById(id);
        } catch(error) {
            throw error;
        }
    },

    async findHistoryByTitle(title) {
        try {
            return await historyModel.getHistoryByTitle(title);
        } catch(error) {
            throw error;
        }
    },

    async updateHistory(id, title, story, updated_by, image_path) {
        try {
            const updatedHistory = await historyModel.updateHistory(id, title, story, updated_by, image_path);
            return updatedHistory;
        } catch(error) {
            throw error;
        }
    },

    async deleteHistory(id) {
        try {
            const deletedHistory = await historyModel.deleteHistory(id);
            return deletedHistory;
        } catch(error) {
            throw error;
        }
    }
};

const comicRepository = {
    async createComic(id_history, comic_order, image_path) {
        try {
            const newComic = await comicModel.createComic(id_history, comic_order, image_path);
            return newComic;
        } catch(error) {
            throw error;
        }
    },

    async getComicsByHistoryId(id_history) {
        try {
            return await comicModel.getComicsByHistoryId(id_history);
        } catch(error) {
            throw error;
        }
    },

    async updateComic(id, comic_order, image_path) {
        //aqui id é id do quadrinho (id_comic) e não id da história (id_history), pois como quero atualizar um quadrinho específico, eu preciso do id do quadrinho e não do id da história, senão atualizaria todos os quadrinhos da história.

        try {
           return await comicModel.updateComic(id, comic_order, image_path);
        } catch(error) {
            throw error;
        }
    },

    async deleteComic(id) {
        try {
            return await comicModel.deleteComic(id);
        } catch(error) {
            throw error;
        }
    }
}

module.exports = { historyRepository, comicRepository };