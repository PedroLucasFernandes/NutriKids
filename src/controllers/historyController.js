const historyService = require('../services/historyService.js');

const historyController = {
    async addNewHistory(req, res) {
        const { title, story, created_by, updated_by } = req.body;
        //na hora de integrar a API com o front-end, o front-end deve enviar um objeto com as propriedades title, story, created_by e updated_by no corpo da requisição ao realizar o fetch para a rota /api/history. assim: { title: 'história1', story: 'o texto da história...', created_by: 'admin1', updated_by: 'admin1' }.

        try {
            const newHistory = await historyService.addNewHistory(title, story, created_by, updated_by);
            res.status(201).json(newHistory);
            //status 201 significa que um novo recurso foi criado. o novo recurso é retornado no corpo da resposta.
        } catch(error) {
            console.error('erro ao tentar adicionar nova história', error);
            res.status(500).send('erro interno do servidor');
        }
    },

    async findHistory(req, res) {
        try {
            const allHistory = await historyService.findHistory();
            res.status(200).json(allHistory);
        } catch(error) {
            console.error('erro ao tentar localizar histórias', error);
            res.status(500).send('erro interno do servidor');
        }
    },

    async findHistoryById(req, res) {
        const { id } = req.params;

        try {
            const foundHistory = await historyService.findHistoryById(id);
            res.status(200).json(foundHistory);
        } catch(error) {
            console.error('erro ao tentar localizar história', error);
            res.status(500).send('erro interno do servidor');
        }
    },

    async updateHistory(req, res) {
        const { id } = req.params;
        const { title, story, updated_by } = req.body;

        try {
            const updatedHistory = await historyService.updateHistory(id, title, story, updated_by);
            res.status(200).json(updatedHistory);
        } catch(error) {
            console.error('erro ao tentar atualizar história', error);
            res.status(500).send('erro interno do servidor');
        }
    },

    async deleteHistory(req, res) {
        const { id } = req.params;

        try {
            const deletedHistory = await historyService.deleteHistory(id);
            res.status(200).json(deletedHistory);
        } catch (error) {
            console.error('erro ao tentar deletar história', error);
            res.status(500).send('erro interno do servidor');
        }
    }
}

module.exports = historyController;

//testar addNewHistory:
//curl -i -X POST -H "Content-Type: application/json" -d '{"title": "história4", "story": "o texto da história...", "created_by": "admin1", "updated_by": "admin1"}' http://localhost:3000/api/history

//testar findHistory:
//curl -X GET http://localhost:3000/api/history

//testar FindHistoryById:
//curl -X GET http://localhost:3000/api/history/6

//testar updateHistory:
//curl -i -X PUT -H "Content-Type: application/json" -d '{"title": "história4", "story": "o texto da história MUDOU ...", "updated_by": "admin1"}' http://localhost:3000/api/history/6

//testar deleteHistory:
//curl -i -X DELETE http://localhost:3000/api/history/1