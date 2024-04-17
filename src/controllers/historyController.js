const historyAndComicService = require('../services/historyAndComicService.js');

const historyController = {
    async addNewHistory(req, res) {
        //INTEGRAÇÃO API COM FRONT-END: o front-end deve enviar um objeto com as propriedades title, story, created_by, updated_by, image_path e comics (que será um array de objetos, onde cada objeto terá as propriedades comic_order e image_path) no corpo da requisição HTTP POST ao realizar o fetch para a rota /api/history. lembrando que será necessário, também, enviar o token de sessão pelo cabeçalho da requisição. o objeto ficará assim: { "title": "história teste", "story": "o texto da história...", "created_by": 1, "updated_by": 1, "image_path": "https://drive.google.com/file/d/1goo6MbNf78LXVzCdy9XHLq3TMbL3lI18/view?usp=drive_link", "comics": [ { "comic_order": 1, "image_path": "https://drive.google.com/file/d/1veUcJ5zTZ_n4duMVt_gnWrMJIcHKkVLv/view?usp=drive_link" }, { "comic_order": 2, "image_path": "https://drive.google.com/file/d/1yET21LrAriiHm_ep6ZJNezydrXF52hGh/view?usp=drive_link" } ] };

        const { title, story, created_by, updated_by, image_path, comics } = req.body;

        try {
            const newHistory = await historyAndComicService.addNewHistoryWithComics(title, story, created_by, updated_by, image_path, comics);
            res.status(201).json(newHistory);
            //status 201 significa que um novo recurso foi criado. o novo recurso é retornado no corpo da resposta.
        } catch(error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar adicionar nova história' });
        }
    },

    async findHistory(req, res) {
        //INTEGRAÇÃO API COM FRONT-END: não precisa enviar nenhum obheto no corpo da requisição HTTP GET ao realizar o fetch para a rota /api/history.

        try {
            const allHistory = await historyAndComicService.findAllHistoryWithComics();
            res.status(200).json(allHistory);
        } catch(error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar localizar histórias' });
        }
    },

    async findHistoryById(req, res) {
        //INTERRAÇÃO API COM FRONT-END: não precisa enviar nenhum objeto no corpo da requisição HTTP GET ao realizar o fetch para a rota /api/history/:id. só lembre-se de colocar o id da história na url.

        const { id } = req.params;

        try {
            const foundHistory = await historyAndComicService.findHistoryWithComicsById(id);
            res.status(200).json(foundHistory);
        } catch(error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar localizar história com quadrinhos' });
        }
    },

    async updateHistory(req, res) {
        //INTEGRAÇÃO DA API COM FRONT-END: o objeto enviado no corpo da requisição HTTP PUT ao realizar o fetch para a rota /api/history/:id deve conter as propriedades title, story, updated_by, image_path e comics (que será um array de objetos, onde cada objeto terá as propriedades id, comic_order e image_path). lembrando que será necessário, também, enviar o token de sessão pelo cabeçalho da requisição. o objeto ficará assim: { "title": "história teste 2", "story": "o texto da história mudou...", "updated_by": 1, "image_path": "https://ichef.bbci.co.uk/news/976/cpsprodpb/16332/production/_95403909_beyonce1_getty.jpg", "comics": [ { "id": 7, "comic_order": 1, "image_path": "https://ichef.bbci.co.uk/news/976/cpsprodpb/16332/production/_95403909_beyonce1_getty.jpg" }, { "id": 8, "comic_order": 2, "image_path": "https://ichef.bbci.co.uk/news/976/cpsprodpb/16332/production/_95403909_beyonce1_getty.jpg" } ] };

        const { id } = req.params;
        const { title, story, updated_by, image_path, comics } = req.body;

        try {
            const updatedHistory = await historyAndComicService.updateHistoryWithComics(id, title, story, updated_by, image_path, comics);
            res.status(200).json(updatedHistory);
        } catch(error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar atualizar história' });
        }
    },

    async deleteHistory(req, res) {
        //INTEGRAÇÃO API COM FRONT-END: não precisa enviar nenhum objeto no corpo da requisição HTTP DELETE ao realizar o fetch para a rota /api/history/:id. só lembre-se de colocar o id da história na url. e, também, lembre-se de enviar o token de sessão pelo cabeçalho da requisição.

        const { id } = req.params;

        try {
            const deletedHistory = await historyAndComicService.deleteHistoryWithComics(id);
            res.status(200).json(deletedHistory);
        } catch (error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar deletar história' });
        }
    }
}

module.exports = historyController;



//testar findHistory:
//curl -X GET http://localhost:3000/api/history

//testar FindHistoryById:
//curl -X GET http://localhost:3000/api/history/22



//rotas que requerem cookie de sessão:
//testar addNewHistory:
//curl -i -X POST -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxMzM4NjU5NCwiZXhwIjoxNzEzMzkwMTk0fQ.SobIcu7AU3Xeibqae5NdHIqCo1qma5wBeh0f_9gUejk" -H "Content-Type: application/json" -d '{ "title": "história teste 3", "story": "o texto da história...", "created_by": 1, "updated_by": 1, "image_path": "https://drive.google.com/file/d/1goo6MbNf78LXVzCdy9XHLq3TMbL3lI18/view?usp=drive_link", "comics": [ { "comic_order": 1, "image_path": "https://drive.google.com/file/d/1veUcJ5zTZ_n4duMVt_gnWrMJIcHKkVLv/view?usp=drive_link" }, { "comic_order": 2, "image_path": "https://drive.google.com/file/d/1yET21LrAriiHm_ep6ZJNezydrXF52hGh/view?usp=drive_link" } ] }' http://localhost:3000/api/history

//testar updateHistory:
//curl -i -X PUT -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxMzM4NjU5NCwiZXhwIjoxNzEzMzkwMTk0fQ.SobIcu7AU3Xeibqae5NdHIqCo1qma5wBeh0f_9gUejk" -H "Content-Type: application/json" -d '{ "title": "história teste 3b", "story": "o texto da história mudou...", "updated_by": 1, "image_path": "https://ichef.bbci.co.uk/news/976/cpsprodpb/16332/production/_95403909_beyonce1_getty.jpg", "comics": [ { "id": 9, "comic_order": 1, "image_path": "https://ichef.bbci.co.uk/news/976/cpsprodpb/16332/production/_95403909_beyonce1_getty.jpg" }, { "id": 10, "comic_order": 2, "image_path": "https://ichef.bbci.co.uk/news/976/cpsprodpb/16332/production/_95403909_beyonce1_getty.jpg" } ] }' http://localhost:3000/api/history/25

//testar deleteHistory:
//curl -i -X DELETE -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxMzM4NjU5NCwiZXhwIjoxNzEzMzkwMTk0fQ.SobIcu7AU3Xeibqae5NdHIqCo1qma5wBeh0f_9gUejk" http://localhost:3000/api/history/25