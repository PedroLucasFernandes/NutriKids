const e = require('express');
const { createRecipe, updateRecipe } = require('../models/recipeModel.js');
const recipeService = require('../services/recipeService.js');
const fs = require("fs");
const { get } = require('http');
const { updateHistory } = require('./historyController');

const recipeController = {
    async createRecipe(req, res) {
        const { title, yield, ingredients, instructions, created_by, updated_by } = req.body;
        const file = req.files;

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
        } else if (typeof created_by !== 'number') {
            return res.status(400).json({ error: 'id do criador da receita deve ser um número' });
        }

        if (!updated_by) {
            return res.status(400).json({ error: 'id do atualizador da receita é obrigatório' });
        } else if (typeof updated_by !== 'number') {
            return res.status(400).json({ error: 'id do atualizador da receita deve ser um número' });
        }

        //???:
        const banner = file[0].filename;

        try {
            const newRecipe = await recipeService.createRecipe(title, banner, yield, ingredients, instructions, created_by, updated_by);
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

        if (!id) {
            return res.status(400).json({ error: 'id da receita é obrigatório' });
        } else if (typeof id !== 'number') {
            return res.status(400).json({ error: 'id da receita deve ser um número' });
        }

        try {
            const recipe = await recipeService.getRecipeById(id);
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

        if (!id) {
            return res.status(400).json({ error: 'id da receita é obrigatório' });
        } else if (typeof id !== 'number') {
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
        } else if (typeof updated_by !== 'number') {
            return res.status(400).json({ error: 'id do atualizador da receita deve ser um número' });
        }

        //file não pode ser null (?):
        if (!file) {
            return res.status(400).json({ error: 'imagem da receita é obrigatória' });
        }

        const banner = file[0].filename;

        try {
            const oldRecipe = await recipeService.getRecipeById(id);
            const updatedHistory = await recipeService.updateRecipe(id, title, banner, yield, ingredients, instructions, updated_by);

            if (fs.existsSync(`src/public/uploads/${oldRecipe.image_path}`)) {
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

        if (!id) {
            return res.status(400).json({ error: 'id da receita é obrigatório' });
        } else if (typeof id !== 'number') {
            return res.status(400).json({ error: 'id da receita deve ser um número' });
        }

        try {
            const recipe = await recipeService.getRecipeById(id);
            const deletedRecipe = await recipeService.deleteRecipe(id);

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