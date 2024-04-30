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

router.post('/', upload.array("file"), validateData(createRecipeValidationRules), recipeController.createRecipe);
router.put('/:id', upload.array("file"), validateData(updateRecipeValidationRules), recipeController.updateRecipe);
router.delete('/:id', validateData(deleteRecipeValidationRules), recipeController.deleteRecipe);

module.exports = router;