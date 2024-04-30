const recipeService = require('../services/recipeService.js');
const fs = require("fs");

const recipeController = {
    async createRecipe(req, res) {
        const { title, yield, ingredients, instructions, created_by, updated_by } = req.body;
        const file = req.files;
        const created_by_number = parseInt(created_by);
        const updated_by_number = parseInt(updated_by);

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
                try {
                    fs.unlinkSync(`src/public/uploads/${banner}`);
                } catch (err) {
                    console.error('erro ao excluir o arquivo:', err);
                }
            }
            res.status(500).json({ error: 'erro ao tentar adicionar nova receita e sua respectiva imagem' });
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
    
        const id_number = parseInt(id);
        const updated_by_number = parseInt(updated_by);

        try {
            const oldRecipe = await recipeService.getRecipeById(id_number);
            const banner = file?.[0]?.filename || oldRecipe.image_path;
            
            const updatedHistory = await recipeService.updateRecipe(id_number, title, banner, yield, ingredients, instructions, updated_by_number);

            if (updatedHistory.image_path !== oldRecipe.image_path && fs.existsSync(`src/public/uploads/${oldRecipe.image_path}`)) {
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
// curl -X GET http://localhost:3000/api/recipe/9

//createRecipe:
// curl -i -X POST -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxNDQ4NzMwNCwiZXhwIjoxNzE0NDkwOTA0fQ.ytdXbBibTlkZ21IHXxNtfdw_a7oP6-4aWu5VRGeLLrA" \
// -H "Content-Type: multipart/form-data" \
// -F "title=cachorro quente da vovó" \
// -F "yield=4 porções" \
// -F "ingredients=ingredientes da receita..." \
// -F "instructions=modo de preparo da receita..." \
// -F "created_by=1" \
// -F "updated_by=1" \
// -F "file=@/home/bytemeyu/Downloads/cachorroquente.webp" \
// http://localhost:3000/api/recipe

//updateRecipe: 
// curl -i -X PUT -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxNDQ4NzMwNCwiZXhwIjoxNzE0NDkwOTA0fQ.ytdXbBibTlkZ21IHXxNtfdw_a7oP6-4aWu5VRGeLLrA" \
// -H "Content-Type: multipart/form-data" \
// -F "title=cachorro quente do vovô" \
// -F "yield=4 porções" \
// -F "ingredients=ingredientes da receita" \
// -F "instructions=modo de preparo da receita..." \
// -F "updated_by=1" \
// http://localhost:3000/api/recipe/12

//deleteRecipe:
// curl -i -X DELETE -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxNDQ4NzMwNCwiZXhwIjoxNzE0NDkwOTA0fQ.ytdXbBibTlkZ21IHXxNtfdw_a7oP6-4aWu5VRGeLLrA" http://localhost:3000/api/recipe/12