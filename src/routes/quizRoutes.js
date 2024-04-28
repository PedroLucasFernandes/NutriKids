const express = require('express');

const quizController = require('../controllers/quizController');

const authMiddleware = require('../middlewares/authMiddleware.js');

const validateData = require('../middlewares/dynamicValidationMiddleware.js');

const router = express.Router();

const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const { title } = require('process');
const { questionRepository } = require('../repositories/quizRepository.js');
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

const addNewQuizValidationRules = {
    title: { required: true, type: 'string', maxLength: 100 },
    created_by: { required: true, type: 'number' },
    updated_by: { required: true, type: 'number' },
    questions: { required: true }
}

const findQuizByIdValidationRules = {
    id: { required: true, type: 'number' }
}

const updateQuizValidationRules = {
    id: { required: true, type: 'number' },
    title: { type: 'string', maxLength: 100 },
    updated_by: { required: true, type: 'number' },
    questions: { required: true }
}

const deleteQuizValidationRules = {
    id: { required: true, type: 'number' }
}

router.get('/', quizController.findQuiz);
router.get('/:id', validateData(findQuizByIdValidationRules), quizController.findQuizById);

router.use(authMiddleware.verifyToken);

router.post('/', upload.single("file"), validateData(addNewQuizValidationRules), quizController.addNewQuiz);
router.put('/:id', upload.single("file"), validateData(updateQuizValidationRules), quizController.updateQuiz);
router.delete('/:id', validateData(deleteQuizValidationRules), quizController.deleteQuiz);

module.exports = router;