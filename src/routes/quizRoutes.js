const express = require('express');

const quizController = require('../controllers/quizController');

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

router.get('/', quizController.findQuiz);
router.get('/:id', quizController.findQuizById);

router.use(authMiddleware.verifyToken);

router.post('/', upload.single("file"), quizController.addNewQuiz);
router.put('/:id', upload.single("file"), quizController.updateQuiz);
router.delete('/:id', quizController.deleteQuiz);

module.exports = router;