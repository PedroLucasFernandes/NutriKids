const express = require('express');

const recipeController = require('../controllers/recipeController.js');

const authMiddleware = require('../middlewares/authMiddleware.js');

const validateData = require('../middlewares/dynamicValidationMiddleware.js');

const router = express.Router();

const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const { required } = require('../utils/validationUtils.js');
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



const createRecipeValidationRules = {
    title: { required: true, type: 'string', maxLength: 100 },
    yield: { required: true, type: 'string', maxLength: 50 },
    ingredients: { required: true },
    instructions: { required: true },
    created_by: { required: true, type: 'number' },
    updated_by: { required: true, type: 'number' }
};

const getRecipeByIdValidationRules = {
    id: { required: true, type: 'number' }
};

const updateRecipeValidationRules = {
    id: { required: true, type: 'number' },
    title: { type: 'string', maxLength: 100 },
    yield: { type: 'string', maxLength: 50 },
    ingredients: { required: true },
    instructions: { required: true},
    updated_by: { required: true, type: 'number' }
};

const deleteRecipeValidationRules = {
    id: { required: true, type: 'number' }
};



router.get('/', recipeController.getRecipe);
router.get('/:id', validateData(getRecipeByIdValidationRules), recipeController.getRecipeById);

router.use(authMiddleware.verifyToken);
//PORQUE DIABOS AS ROTAS ACIMA ESTÃO EXIGINDO A AUTENTICAÇÃO, SE ELAS ESTÃO ANTES DO MIDDLEWARE DE AUTENTICAÇÃO??? isso acontece pelo fato de no app.js, as rotas serem todas /api, então quando ele entra na /api historyRoutes e em dado momento aplica o middleware de autenticação, ele permacene aplicando nas rotas subsequentes. devo corrigir lá no app.js as rotas para /api/recipe, /api/history, /api/quiz, /api/admin. e aqui devo corrigir as rotas para /, /:id, /, /:id, /:id.

router.post('/', upload.array("file"), validateData(createRecipeValidationRules), recipeController.createRecipe);
//Portanto, a configuração correta em um aplicativo que recebe uploads de arquivos com dados adicionais seria colocar multer antes de qualquer middleware que necessite acessar esses dados para processamento ou validação. Isso assegura que quando a validação ocorrer, todos os dados enviados na requisição estejam disponíveis e devidamente formatados para serem validados corretamente.

router.put('/:id', upload.array("file"), validateData(updateRecipeValidationRules), recipeController.updateRecipe);

router.delete('/:id', validateData(deleteRecipeValidationRules), recipeController.deleteRecipe);

module.exports = router;