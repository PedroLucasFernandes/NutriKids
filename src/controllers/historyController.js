const historyAndComicService = require('../services/historyAndComicService.js');
const fs = require("fs");

const historyController = {
    async addNewHistory(req, res) {
        //INTEGRAÇÃO API COM FRONT-END: []

        const { title, story, created_by, updated_by} = req.body;
        const file = req.files;
        const created_by_number = parseInt(created_by);
        const updated_by_number = parseInt(updated_by);

        //validação para title (varchar(255) e not null):
        if (!title) {
            return res.status(400).json({ error: 'título da história é obrigatório' });
        } else if (title.length > 255) {
            return res.status(400).json({ error: 'título da história deve ter no máximo 255 caracteres' });
        }

        //validação para story (text e not null):
        if (!story) {
            return res.status(400).json({ error: 'texto da história é obrigatório' });
        }

        //validação para created_by (int e not null):
        if (!created_by) {
            return res.status(400).json({ error: 'id do criador da história é obrigatório' });
        } else if (typeof created_by_number !== 'number') {
            return res.status(400).json({ error: 'id do criador da história deve ser um número' });
        }

        //validação para updated_by (int e not null):
        if (!updated_by) {
            return res.status(400).json({ error: 'id do atualizador da história é obrigatório' });
        } else if (typeof updated_by_number !== 'number') {
            return res.status(400).json({ error: 'id do atualizador da história deve ser um número' });
        }

        //validação para file: [PERGUNTAR PARA PEDRO]
        
        const banner = file[0].filename;
        const comics = file.slice(1);

        try {
            const newHistory = await historyAndComicService.addNewHistoryWithComics(title, story, created_by_number, updated_by_number, banner, comics);
            res.status(201).json(newHistory);
        } catch(error) {
            console.error(`${error.message}`);
            if (fs.existsSync(`src/public/uploads/${banner}`)) {
                try {
                  fs.unlinkSync(`src/public/uploads/${banner}`);
                  comics.forEach(comic => {
                    if(fs.existsSync(`src/public/uploads/${comic.filename}`)){
                        fs.unlinkSync(`src/public/uploads/${comic.filename}`);
                    }
                  });
                } catch (err) {
                  console.error('Erro ao excluir o arquivo:', err);
                }
            }
            res.status(500).json({ error: 'erro ao tentar adicionar nova história' });
        }
    },

    async findHistory(req, res) {
        //INTEGRAÇÃO API COM FRONT-END: não precisa enviar nenhum objeto no corpo da requisição HTTP GET ao realizar o fetch para a rota /api/history.

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
        const id_number = parseInt(id);

        //validação para id (int e not null):
        if (!id) {
            return res.status(400).json({ error: 'id da história é obrigatório' });
        }

        try {
            const foundHistory = await historyAndComicService.findHistoryWithComicsById(id_number);
            res.status(200).json(foundHistory);
        } catch(error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar localizar história com quadrinhos' });
        }
    },

    async updateHistory(req, res) {
        //INTEGRAÇÃO DA API COM FRONT-END: []

        const { id } = req.params;
        const { title, story, updated_by } = req.body;
        const file = req.files;
        const id_number = parseInt(id);
        const updated_by_number = parseInt(updated_by);

        //validação para id (int e not null):
        if (!id) {
            return res.status(400).json({ error: 'id da história é obrigatório' });
        } 

        //validação para title (varchar(255) e not null):
        if (!title) {
            return res.status(400).json({ error: 'título da história é obrigatório' });
        } else if (title.length > 255) {
            return res.status(400).json({ error: 'título da história deve ter no máximo 255 caracteres' });
        }

        //validação para story (text e not null):
        if (!story) {
            return res.status(400).json({ error: 'texto da história é obrigatório' });
        }

        //validação para updated_by (int e not null):
        if (!updated_by) {
            return res.status(400).json({ error: 'id do atualizador da história é obrigatório' });
        } else if (typeof updated_by_number !== 'number') {
            return res.status(400).json({ error: 'id do atualizador da história deve ser um número' });
        }

        //validação para file: [PERGUNTAR PARA PEDRO]

        const banner = file[0].filename;
        const comics = file.slice(1);

        try { 
            const oldHistory = await historyAndComicService.findHistoryWithComicsById(id_number);
            const updatedHistory = await historyAndComicService.updateHistoryWithComics(id_number, title, story, updated_by_number, banner, comics);
            
            if (fs.existsSync(`src/public/uploads/${oldHistory.image_path}`)) {
                fs.unlinkSync(`src/public/uploads/${oldHistory.image_path}`);
            }
            
            oldHistory.comics.forEach(comic => {
                if (fs.existsSync(`src/public/uploads/${comic.image_path}`)) {
                    fs.unlinkSync(`src/public/uploads/${comic.image_path}`);
                }
            });
            
            res.status(200).json(updatedHistory);
        } catch(error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar atualizar história' });
        }
    },

    async deleteHistory(req, res) {
        //INTEGRAÇÃO API COM FRONT-END: não precisa enviar nenhum objeto no corpo da requisição HTTP DELETE ao realizar o fetch para a rota /api/history/:id. só lembre-se de colocar o id da história na url. e, também, lembre-se de enviar o token de sessão pelo cabeçalho da requisição.

        const { id } = req.params;
        const id_number = parseInt(id);

        //validação para id (int e not null):
        if (!id) {
            return res.status(400).json({ error: 'id da história é obrigatório' });
        }

        try {
            const history = await historyAndComicService.findHistoryWithComicsById(id_number);
            const deletedHistory = await historyAndComicService.deleteHistoryWithComics(id_number);
            
            if (fs.existsSync(`src/public/uploads/${history.image_path}`)) {
                fs.unlinkSync(`src/public/uploads/${history.image_path}`);
            }
            history.comics.forEach(comic => {
                if (fs.existsSync(`src/public/uploads/${comic.image_path}`)) {
                    fs.unlinkSync(`src/public/uploads/${comic.image_path}`);
                }
            });
            
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
//curl -X GET http://localhost:3000/api/history/88

//rotas que requerem cookie de sessão:
//testar addNewHistory:
// curl -i -X POST -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxMzgyMjA2MSwiZXhwIjoxNzEzODI1NjYxfQ.X8x5U6oP9NP7zjxaMXjUs2tg4iaFGfyy7Xc-XuVGX3o" \
// -H "Content-Type: multipart/form-data" \
// -F "title=história teste UUUUU" \
// -F "story=o texto da história..." \
// -F "created_by=1" \
// -F "updated_by=1" \
// -F "file=@/home/bytemeyu/Downloads/bolo.webp" \
// -F "file=@/home/bytemeyu/Downloads/bolo.webp" \
// http://localhost:3000/api/history

//testar updateHistory:
// curl -i -X PUT -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxMzgyMjA2MSwiZXhwIjoxNzEzODI1NjYxfQ.X8x5U6oP9NP7zjxaMXjUs2tg4iaFGfyy7Xc-XuVGX3o" \
// -H "Content-Type: multipart/form-data" \
// -F "title=história teste YYYYY" \
// -F "story=o texto da história..." \
// -F "updated_by=1" \
// -F "file=@/home/bytemeyu/Downloads/bolo.webp" \
// -F "file=@/home/bytemeyu/Downloads/bolo.webp" \
// http://localhost:3000/api/history/88


//testar deleteHistory:
// curl -i -X DELETE -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxMzgyMjA2MSwiZXhwIjoxNzEzODI1NjYxfQ.X8x5U6oP9NP7zjxaMXjUs2tg4iaFGfyy7Xc-XuVGX3o" http://localhost:3000/api/history/88