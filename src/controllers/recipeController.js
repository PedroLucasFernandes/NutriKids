const recipeService = require('../services/recipeService.js');
const fs = require("fs");

const recipeController = {
    async createRecipe(req, res) {
        const { title, yield, ingredients, instructions, created_by, updated_by } = req.body;
        const file = req.files;
        const created_by_number = parseInt(created_by);
        const updated_by_number = parseInt(updated_by);

        if (!title) {
            return res.status(400).json({ error: 'título da receita é obrigatório' });
        } else if (title.length > 100) {
            return res.status(400).json({ error: 'título da receita deve ter no máximo 255 caracteres' });
        }

        if (!yield) {
            return res.status(400).json({ error: 'rendimento da receita é obrigatório' });
        } else if (yield.length > 50) {
            return res.status(400).json({ error: 'rendimento da receita deve ter no máximo 100 caracteres' });
        }

        if (!ingredients) {
            return res.status(400).json({ error: 'ingredientes da receita são obrigatórios' });
        }

        if (!instructions) {
            return res.status(400).json({ error: 'modo de preparo da receita é obrigatório' });
        }

        if (!created_by) {
            return res.status(400).json({ error: 'id do criador da receita é obrigatório' });
        } else if (typeof created_by_number !== 'number') {
            return res.status(400).json({ error: 'id do criador da receita deve ser um número' });
        }

        if (!updated_by) {
            return res.status(400).json({ error: 'id do atualizador da receita é obrigatório' });
        } else if (typeof updated_by_number !== 'number') {
            return res.status(400).json({ error: 'id do atualizador da receita deve ser um número' });
        }

        //file não pode ser null (?):
        if (!file) {
            return res.status(400).json({ error: 'imagem para capa da receita é obrigatória' });
        }

        const banner = file[0].filename;

        try {
            const newRecipe = await recipeService.createRecipe(title, banner, yield, ingredients, instructions, created_by_number, updated_by_number);
            res.status(201).json(newRecipe);
        } catch (error) {
            console.error(`${error.message}`);
            if (fs.existsSync(`src/public/uploads/${banner}`)) {
                //se o processo de adicionar receita falhar, o arquivo de imagem da receita é excluído
                try {
                    fs.unlinkSync(`src/public/uploads/${banner}`);
                } catch (err) {
                    console.error('erro ao excluir o arquivo:', err);
                }
            }
            res.status(500).json({ error: 'erro ao tentar adicionar nova receita' });
        }
    },

    async getRecipe(req, res) {
        try {
            const recipes = await recipeService.getRecipe();
            res.status(200).json(recipes);
        } catch (error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar buscar receitas' });
        }
    },

    async getRecipeById(req, res) {
        const { id } = req.params;
        const id_number = parseInt(id);

        if (!id) {
            return res.status(400).json({ error: 'id da receita é obrigatório' });
        } else if (typeof id_number !== 'number') {
            return res.status(400).json({ error: 'id da receita deve ser um número' });
        }

        try {
            const recipe = await recipeService.getRecipeById(id_number);
            res.status(200).json(recipe);
        } catch (error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar buscar receita' });
        }
    },

    async updateRecipe(req, res) {
        const id = req.params.id;
        const { title, yield, ingredients, instructions, updated_by } = req.body;
        const file = req.files;
        //file armazenará a imagem da receita, se houver. req.files é uma propriedade do objeto req que contém os arquivos enviados pelo cliente. req.files é um array, então file[0] é o primeiro elemento do array, que é o arquivo único de imagem, nesse caso das receitas, isso se o cliente quiser atualizar a imagem da receita.
        const id_number = parseInt(id);
        const updated_by_number = parseInt(updated_by);

        if (!id) {
            return res.status(400).json({ error: 'id da receita é obrigatório' });
        } else if (typeof id_number !== 'number') {
            return res.status(400).json({ error: 'id da receita deve ser um número' });
        }

        if (!title) {
            return res.status(400).json({ error: 'título da receita é obrigatório' });
        } else if (title.length > 100) {
            return res.status(400).json({ error: 'título da receita deve ter no máximo 255 caracteres' });
        }

        if (!yield) {
            return res.status(400).json({ error: 'rendimento da receita é obrigatório' });
        } else if (yield.length > 50) {
            return res.status(400).json({ error: 'rendimento da receita deve ter no máximo 100 caracteres' });
        }

        if (!ingredients) {
            return res.status(400).json({ error: 'ingredientes da receita são obrigatórios' });
        }

        if (!instructions) {
            return res.status(400).json({ error: 'modo de preparo da receita é obrigatório' });
        }

        if (!updated_by) {
            return res.status(400).json({ error: 'id do atualizador da receita é obrigatório' });
        } else if (typeof updated_by_number !== 'number') {
            return res.status(400).json({ error: 'id do atualizador da receita deve ser um número' });
        }

        //para tornar opcional o upload de uma nova imagem para a receita, tiramos o if (!file)...

        try {
            const oldRecipe = await recipeService.getRecipeById(id_number);
            const banner = file?.[0]?.filename || oldRecipe.image_path;
            //o código acima lança mão do encadeamento opcional (?.), que significa que se file for null ou undefined, o código para de ser executado, retorna undefined e, nesse caso, já pula pra depois do 'ou' e banner será oldRecipe.image_path. se file existir, o código continua a ser executado normalmente, e ele tentará acessar o primeiro elemento do array (file[0]). se file[0] existir, o código, mais uma vez, continua a ser executado normalmente e ele acessará a propriedade filename (file[0].filename) desse objeto que está no primeiro elemento do array file, ou seja, o image_path da nova imagem da receita. resumindo: se file ou file[0] for null ou undefined, o valor de banner será oldRecipe.image_path. 
            //essa linha de código atribui à variável banner o nome do arquivo do primeiro elemento do array file, se disponível. caso contrário, usa o caminho da imagem já existente no objeto oldRecipe. Isso é útil em cenários como atualizações de formulários onde um novo arquivo pode ser carregado para substituir um existente, mas se um novo não for fornecido, mantém-se o existente.
            //é usado esse encadeamento opcional para que não seja gerado um erro do tipo TypeError, o que causaria a interrupção do código naquele ponto, o que impediria com que banner fosse atribuído a oldRecipe.image_path. portanto, é importante usar esse encadeamento opcional quando há a possibilidade de que uma variável seja null ou undefined, especialmente quando segue-se com um 'or' para fornecer um fallback. no caso de um fallback ser acionado, o código anterior a ele (o encadeamento opcional) falha silenciosamente para o valor undefined, e o código continua a ser executado normalmente.
            const updatedHistory = await recipeService.updateRecipe(id_number, title, banner, yield, ingredients, instructions, updated_by_number);

            if (updatedHistory.image_path !== oldRecipe.image_path && fs.existsSync(`src/public/uploads/${oldRecipe.image_path}`)) {
                //se o processo de atualizar receita falhar, o arquivo de imagem da receita é excluído
                try {
                    fs.unlinkSync(`src/public/uploads/${oldRecipe.image_path}`);
                } catch (err) {
                    console.error('erro ao excluir o arquivo:', err);
                }
            } 
            
            res.status(200).json(updatedHistory);
        } catch (error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar atualizar receita' });
        }

    },

    async deleteRecipe(req, res) {
        const { id } = req.params;
        const id_number = parseInt(id);

        if (!id) {
            return res.status(400).json({ error: 'id da receita é obrigatório' });
        } else if (typeof id_number !== 'number') {
            return res.status(400).json({ error: 'id da receita deve ser um número' });
        }

        try {
            const recipe = await recipeService.getRecipeById(id_number);
            const deletedRecipe = await recipeService.deleteRecipe(id_number);

            if (fs.existsSync(`src/public/uploads/${recipe.image_path}`)) {
                try {
                    fs.unlinkSync(`src/public/uploads/${recipe.image_path}`);
                } catch (err) {
                    console.error('erro ao excluir o arquivo:', err);
                }
            }

            res.status(200).json(deletedRecipe);
        } catch (error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar excluir receita' });
        }
    }
};

module.exports = recipeController;



//getRecipe:
// curl -X GET http://localhost:3000/api/recipe

//getRecipeById:
// curl -X GET http://localhost:3000/api/recipe/2

//createRecipe:
// curl -i -X POST -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxMzg3NjE3NywiZXhwIjoxNzEzODc5Nzc3fQ.FRWzngmDyh4HMQuirYo09408AEsAeklMfJ1ebT7Nd8k" \
// -H "Content-Type: multipart/form-data" \
// -F "title=receita teste" \
// -F "yield=4 porções" \
// -F "ingredients=ingredientes da receita..." \
// -F "instructions=modo de preparo da receita..." \
// -F "created_by=1" \
// -F "updated_by=1" \
// -F "file=@/home/bytemeyu/Downloads/bolo.webp" \
// http://localhost:3000/api/recipe

//updateRecipe: 
// curl -i -X PUT -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxNDA5MTgzMSwiZXhwIjoxNzE0MDk1NDMxfQ.CPADVZYYC3feV6EGayoknZJaKUtuYZU1mUWd_KN3OIw" \
// -H "Content-Type: multipart/form-data" \
// -F "title=receita teste3" \
// -F "yield=4 porções" \
// -F "ingredients=ingredientes da receita mudaram DE NOVO, porém, imagem não..." \
// -F "instructions=modo de preparo da receita..." \
// -F "updated_by=1" \
// http://localhost:3000/api/recipe/3

//deleteRecipe:
// curl -i -X DELETE -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxMzg3NjE3NywiZXhwIjoxNzEzODc5Nzc3fQ.FRWzngmDyh4HMQuirYo09408AEsAeklMfJ1ebT7Nd8k" http://localhost:3000/api/recipe/2