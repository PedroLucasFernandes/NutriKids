//sim, esse arquivo é quase a mesma coisa que o historyRepository.js. a pequena diferença, nesse caso, é que ele aplica algumas lógicas de negócios, como impedir com que uma história com o mesmo nome que outra já existente seja cadastrada em um novo cadastro. DEPOIS VER: como fazer com que na atualização de um cadastro já existente, ele seja impedido de ser nomeado com um título de uma história que já existe (tirando ela mesma, obviamente)?).

const { historyRepository, comicRepository } = require('../repositories/historyAndComicRepository.js');

const historyAndComicService = {
    async addNewHistoryWithComics(title, story, created_by, updated_by, banner, comics) {
        //o parâmetro comics é um array de objetos, onde cada objeto representa um quadrinho. cada objeto tem as propriedades comic_order e file.
        try {
            const existingHistoryTitle = await historyRepository.findHistoryByTitle(title);
            if(existingHistoryTitle) {
                throw new Error(`camada service: história com o título ${title} já existe`);
            }

            const newHistory = await historyRepository.addNewHistory(title, story, created_by, updated_by, banner, comics);
            //aqui, a nova história é criada no banco de dados, porém ainda não tem quadrinhos associados a ela.

            const id_history = newHistory.id;
            //aqui, eu pego o id da nova história para poder associar os quadrinhos a ela.
            let comic_order = 0;
            const comicsPromises = comics.map(async comic => {
                //aqui optei por usar o método map, pois ele retorna um novo array com o resultado de uma função aplicada a cada elemento do array original. nesse caso, a função é uma função assíncrona que cria um quadrinho no banco de dados. o resultado é um array de promises. e cada quadrinho é associado à nova história criada. [TENTAR ENTENDER MELHOR]
                //comics.map é um método que percorre o array comics e retorna um novo array com o resultado de uma função aplicada a cada elemento do array original. nesse caso, a função é uma função assíncrona que cria um quadrinho no banco de dados. o resultado é um array de promises. [TENTAR ENTENDER MELHOR]
                const filename = comic.filename;
                comic_order ++;
                return await comicRepository.createComic(id_history, comic_order, filename);
                //aqui, eu crio um quadrinho no banco de dados associado à nova história criada. eu passo o id da nova história, o comic_order e o file, que são as propriedades de cada objeto do array comics, e percorro todo o array comics.
            });

            await Promise.all(comicsPromises);
            //aqui, eu espero que todas as promises do array comicsPromises sejam resolvidas. ou seja, eu espero que todos os quadrinhos sejam criados no banco de dados.
            
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
        //esse id é o id da história que será atualizada.
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
                //aqui optei por usar o método map, pois ele retorna um novo array com o resultado de uma função aplicada a cada elemento do array original. nesse caso, a função é uma função assíncrona que cria um quadrinho no banco de dados. o resultado é um array de promises. e cada quadrinho é associado à nova história criada. [TENTAR ENTENDER MELHOR]
                //comics.map é um método que percorre o array comics e retorna um novo array com o resultado de uma função aplicada a cada elemento do array original. nesse caso, a função é uma função assíncrona que cria um quadrinho no banco de dados. o resultado é um array de promises. [TENTAR ENTENDER MELHOR]
                const filename = comic.filename;
                comic_order ++;
                return await comicRepository.createComic(id_history, comic_order, filename);
                //aqui, eu crio um quadrinho no banco de dados associado à nova história criada. eu passo o id da nova história, o comic_order e o file, que são as propriedades de cada objeto do array comics, e percorro todo o array comics.
            });

            await Promise.all(comicsPromises);
            //aqui, eu espero que todas as promises do array comicsPromises sejam resolvidas. ou seja, eu espero que todos os quadrinhos sejam criados no banco de dados.
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