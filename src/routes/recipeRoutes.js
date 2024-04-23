const express = require('express');

const recipeController = require('../controllers/recipeController.js');

const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const upload = multer({
    storage: multer.diskStorage({
        destination: "src/public/uploads",
        filename: function(req, file, cb) {
            const ext = path.extname(file.originalname);
            const fileName = `${uuidv4()}${ext}`;
            cb(null, fileName);
        }
    })
});

router.get('/', recipeController.getRecipe);
router.get('/:id', recipeController.getRecipeById);

router.use(authMiddleware.verifyToken);
//PORQUE DIABOS AS ROTAS ACIMA ESTÃO EXIGINDO A AUTENTICAÇÃO, SE ELAS ESTÃO ANTES DO MIDDLEWARE DE AUTENTICAÇÃO??? isso acontece pelo fato de no app.js, as rotas serem todas /api, então quando ele entra na /api historyRoutes e em dado momento aplica o middleware de autenticação, ele permacene aplicando nas rotas subsequentes. devo corrigir lá no app.js as rotas para /api/recipe, /api/history, /api/quiz, /api/admin. e aqui devo corrigir as rotas para /, /:id, /, /:id, /:id.

router.post('/', upload.array("file"), recipeController.createRecipe);
//esse upload.array("file") é um middleware do multer que processa o arquivo de imagem da receita, ele é passado como segundo argumento para a rota de criação de receita.
router.put('/:id', upload.array("file"), recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;