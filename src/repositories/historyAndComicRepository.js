const { historyModel, comicModel } = require('../models/historyAndComicModel.js');

const historyRepository = {
    async addNewHistory(title, story, created_by, updated_by, banner) {
        try {
            const newHistory = await historyModel.createHistory(title, story, created_by, updated_by, banner);
            return newHistory;
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

    async updateHistory(id, title, story, updated_by, banner, comics) {
        try {
            const updatedHistory = await historyModel.updateHistory(id, title, story, updated_by, banner, comics);
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
    async createComic(id_history, comic_order, filename) {
        try {
            const newComic = await comicModel.createComic(id_history, comic_order, filename);
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
    },

    async deleteComicsByHistoryId(id_history) {
        try {
            return await comicModel.deleteComicsByHistoryId(id_history);
        } catch(error) {
            throw error;
        }
    }
}

module.exports = { historyRepository, comicRepository };