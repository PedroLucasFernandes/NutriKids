const { historyRepository, comicRepository } = require('../repositories/historyAndComicRepository.js');

const historyAndComicService = {
    async addNewHistoryWithComics(title, story, created_by, updated_by, banner, comics) {
        try {
            const existingHistoryTitle = await historyRepository.findHistoryByTitle(title);
            if(existingHistoryTitle) {
                throw new Error(`camada service: história com o título ${title} já existe`);
            }

            const newHistory = await historyRepository.addNewHistory(title, story, created_by, updated_by, banner, comics);

            const id_history = newHistory.id;
            let comic_order = 0;
            const comicsPromises = comics.map(async comic => {
                const filename = comic.filename;
                comic_order ++;
                return await comicRepository.createComic(id_history, comic_order, filename);
            });

            await Promise.all(comicsPromises);
            
            return newHistory;
        } catch(error) {
            console.error(`camada service: erro ao criar história com seus respectivos quadrinhos - ${error.message}`);
            throw error;
        }
    },

    async findAllHistoryWithComics() {
        try {
            const allHistory = await historyRepository.findHistory();
            const allHistoryWithComicsPromises = allHistory.map(async history => {
                const comics = await comicRepository.getComicsByHistoryId(history.id);
                const historyWithComics = { ...history, comics };
                return historyWithComics;
            });

            const allHistoryWithComics = await Promise.all(allHistoryWithComicsPromises);
            return allHistoryWithComics;
        } catch(error) {
            console.error(`${error.message}`);
            throw error;
        }   
    },

    async findHistoryWithComicsById(id) {
        try {
            const history = await historyRepository.findHistoryById(id);
            if(!history) {
                throw new Error(`camada service: nenhuma história encontrada com o id ${id}`);
            }

            const comics = await comicRepository.getComicsByHistoryId(id);
            const historyWithComics = { ...history, comics };
            return historyWithComics;
        } catch(error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async updateHistoryWithComics(id, title, story, updated_by, banner, comics) {
        try {
            const existingHistory = await historyRepository.findHistoryById(id);
            if(!existingHistory) {
                throw new Error(`camada service: nenhuma história encontrada com o id ${id}`);
            }

            const updatedHistory = await historyRepository.updateHistory(id, title, story, updated_by, banner, comics);
            
            const id_history = id;
            await comicRepository.deleteComicsByHistoryId(id_history);
            
            let comic_order = 0;
            const comicsPromises = comics.map(async comic => {
                const filename = comic.filename;
                comic_order ++;
                return await comicRepository.createComic(id_history, comic_order, filename);
            });

            await Promise.all(comicsPromises);
            return updatedHistory;
        } catch(error) {
            console.error(`camada service: erro ao atualizar história com seus respectivos quadrinhos - ${error.message}`);
            throw error;
        }
    },

    async deleteHistoryWithComics(id) {
        try {
            const existingHistory = await historyRepository.findHistoryById(id);
            if(!existingHistory) {
                throw new Error(`camada service: nenhuma história encontrada com o id ${id}`);
            }

            const deletedHistory = await historyRepository.deleteHistory(id);
            const deletedComics = await comicRepository.getComicsByHistoryId(id);
            const comicsPromises = deletedComics.map(async comic => {
                const id_comic = comic.id;
                return await comicRepository.deleteComic(id_comic);
            });

            await Promise.all(comicsPromises);
            return deletedHistory;
        } catch(error) {
            console.error(`camada service: erro ao deletar história com seus respectivos quadrinhos - ${error.message}`);
            throw error;
        }
    }
}

module.exports = historyAndComicService;