const recipeModel = require('../models/recipeModel.js');

const recipeService = {
    async createRecipe(title, image_path, yield, ingredients, instructions, created_by, updated_by) {
        try {
            const existingRecipeTitle = await recipeModel.getRecipeByTitle(title);
            if(existingRecipeTitle) {
                throw new Error(`camada service: receita com o título ${title} já existe`);
            }

            const newRecipe = await recipeModel.createRecipe(title, image_path, yield, ingredients, instructions, created_by, updated_by);
            return newRecipe;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getRecipe() {
        try {
            const recipes = await recipeModel.getRecipe();
            return recipes;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async getRecipeById(id) {
        try {
            const recipe = await recipeModel.getRecipeById(id);
            if(!recipe) {
                throw new Error(`camada service: nenhuma receita encontrada com o id ${id}`);
            }
            return recipe;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async updateRecipe(id, title, image_path, yield, ingredients, instructions, updated_by) {
        try {
            const existingRecipe = await recipeModel.getRecipeById(id);
            if(!existingRecipe) {
                throw new Error(`camada service: nenhuma receita encontrada com o id ${id}`);
            }

            const updatedRecipe = await recipeModel.updateRecipe(id, title, image_path, yield, ingredients, instructions, updated_by);
            return updatedRecipe;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async deleteRecipe(id) {
        try {
            const existingRecipe = await recipeModel.getRecipeById(id);
            if(!existingRecipe) {
                throw new Error(`camada service: nenhuma receita encontrada com o id ${id}`);
            }

            const deletedRecipe = await recipeModel.deleteRecipe(id);
            return deletedRecipe;
        } catch (error) {
            console.error(`${error.message}`);
            throw error;
        }
    }
};

module.exports = recipeService;