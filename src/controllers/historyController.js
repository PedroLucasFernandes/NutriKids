const { Console } = require('console');
const historyAndComicService = require('../services/historyAndComicService.js');
const fs = require("fs");

const historyController = {
    async addNewHistory(req, res) {
        //INTEGRAÇÃO API COM FRONT-END: []

        const { title, story, created_by, updated_by} = req.body;
        const file = req.files;
        const created_by_number = parseInt(created_by);
        const updated_by_number = parseInt(updated_by);

       //file não pode ser null (?):
        if(!file) {
            return res.status(400).json({ error: 'imagens para a história são obrigatórias' });
        }
        
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

        //file pode, sim, ser null, caso o cliente não queira atualizar as imagens (banner e/ou comics)

        try { 
            const oldHistory = await historyAndComicService.findHistoryWithComicsById(id_number);

            const banner = file?.[0]?.filename || oldHistory.image_path;
            //aqui, se o cliente não enviar nenhuma imagem, o valor de file será undefined, e, portanto, file?.[0]?.filename será undefined, e, portanto, banner será oldHistory.image_path.
            const comics = file?.slice(1) || oldHistory.comics.map(comic => comic.image_path);
            //aqui, se o cliente não enviar nenhuma imagem, o valor de file será undefined, e, portanto, file?.slice(1) será undefined, e, portanto o código após o || será executado, e, portanto, comics será um array de strings com os caminhos das imagens dos quadrinhos da história antiga.

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
//curl -X GET http://localhost:3000/api/history/82

//rotas que requerem cookie de sessão:
//testar addNewHistory:
// curl -i -X POST -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxNDQyNzIyMCwiZXhwIjoxNzE0NDMwODIwfQ.Szn1pZqFK1xmnYfcngYNBjj2x2S02WHqVNCIipyrOsg" \
// -H "Content-Type: multipart/form-data" \
// -F "title=história teste" \
// -F "story=o texto da história..." \
// -F "created_by=1" \
// -F "updated_by=1" \
// -F "file=@/home/bytemeyu/Downloads/cachorroquente.webp" \
// -F "file=@/home/bytemeyu/Downloads/cachorroquente.webp" \
// http://localhost:3000/api/history

//testar updateHistory:
// curl -i -X PUT -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxNDQyNzIyMCwiZXhwIjoxNzE0NDMwODIwfQ.Szn1pZqFK1xmnYfcngYNBjj2x2S02WHqVNCIipyrOsg" \
// -H "Content-Type: multipart/form-data" \
// -F "title=HISTÓRIA DO PEDRO MUDOU DE TÍTULO, PORÉM NÃO DE COMICS NEM BANNER" \
// -F "story=o texto da história..." \
// -F "updated_by=1" \
// http://localhost:3000/api/history/95


//testar deleteHistory:
// curl -i -X DELETE -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxNDQyNzIyMCwiZXhwIjoxNzE0NDMwODIwfQ.Szn1pZqFK1xmnYfcngYNBjj2x2S02WHqVNCIipyrOsg" http://localhost:3000/api/history/95