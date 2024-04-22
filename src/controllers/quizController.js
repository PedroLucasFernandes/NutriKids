const quizAndQuestionService = require("../services/quizAndQuestionService");
const fs = require("fs");

const quizController = {
    async addNewQuiz(req, res) {

        const { title, created_by, updated_by, questions} = req.body;
        const banner = req.file.filename;

        try {
            const newQuiz = await quizService.addNewQuiz(title, created_by, updated_by, banner, questions);
            res.status(201).json(newQuiz);
        } catch(error) {
            console.error(`${error.message}`);
            if (fs.existsSync(`src/public/uploads/${banner}`)) {
                fs.unlinkSync(`src/public/uploads/${banner}`);
            }
            res.status(500).json({ error: 'erro ao tentar adicionar um novo quiz' });
        }
    },

    async findQuiz(req, res) {
        try {
            const allQuiz = await quizAndQuestionService.findAllQuizzesWithQuestions();
            res.status(200).json(allQuiz);
        } catch(error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar localizar quizzes' });
        }
    },

    async findQuizById(req, res) {
        const { id } = req.params;

        try {
            const foundQuiz = await quizAndQuestionService.findQuizWithQuestionsById(id);
            res.status(200).json(foundQuiz);
        } catch(error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar localizar quiz' });
        }
    },

    async updateQuiz(req, res) {
        const { id } = req.params;
        const { title, updated_by, questions } = req.body;
        const banner = req.file.filename;

        try { 
            const oldQuiz = await quizAndQuestionService.findQuizWithQuestionsById(id);
            const updatedQuiz = await quizAndQuestionService.updateQuizWithQuestions(id, title, updated_by, banner, questions);
            
            if (fs.existsSync(`src/public/uploads/${oldQuiz.image_path}`)) {
                fs.unlinkSync(`src/public/uploads/${oldQuiz.image_path}`);
            }
            
            res.status(200).json(updatedQuiz);
        } catch(error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar atualizar quiz' });
        }
    },

    async deleteQuiz(req, res) {
        const { id } = req.params;

        try {
            const quiz = await quizAndQuestionService.findQuizWithQuestionsById(id);
            const deletedQuiz = await quizAndQuestionService.deleteQuizWithQuestions(id);
            
            if (fs.existsSync(`src/public/uploads/${quiz.image_path}`)) {
                fs.unlinkSync(`src/public/uploads/${quiz.image_path}`);
            }
            
            res.status(200).json(deletedQuiz);
        } catch (error) {
            console.error(`${error.message}`);
            res.status(500).json({ error: 'erro ao tentar deletar quiz' });
        }
    }
}

module.exports = quizController;