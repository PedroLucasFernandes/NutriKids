const {quizModel, questionModel} = require('../models/quizAndQuestionModel.js');

const quizRepository = {
    async addNewQuiz(title, created_by, updated_by, banner) {
        try {
            const newQuiz = await quizModel.createQuiz(title, created_by, updated_by, banner);
            return newQuiz;
        } catch(error) {
            throw error;
        }
    },
    
    async findQuiz() {
        try {
            return await quizModel.getQuiz();
        } catch(error) {
            throw error;
        }
    },

    async findQuizById(id) {
        try {
            return await quizModel.getQuizById(id);
        } catch(error) {
            throw error;
        }
    },

    async findQuizByTitle(title) {
        try {
            return await quizModel.getQuizByTitle(title);
        } catch(error) {
            throw error;
        }
    },

    async updateQuiz(id, title, updated_by, banner) {
        try {
            const updatedQuiz = await quizModel.updateQuiz(id, title, updated_by, banner);
            return updatedQuiz;
        } catch(error) {
            throw error;
        }
    },

    async deleteQuiz(id) {
        try {
            const deletedQuiz = await quizModel.deleteQuiz(id);
            return deletedQuiz;
        } catch(error) {
            throw error;
        }
    }
};

const questionRepository = {
    async createQuestion(id_quiz, question_text, option_1, option_2, option_3, option_4, answer, explanation) {
        try {
            const newQuestion = await questionModel.createQuestion(id_quiz, question_text, option_1, option_2, option_3, option_4, answer, explanation);
            return newQuestion;
        } catch(error) {
            throw error;
        }
    },

    async getQuestionsByQuizId(id_quiz) {
        try {
            return await questionModel.getQuestionsByQuizId(id_quiz);
        } catch(error) {
            throw error;
        }
    },

    async deleteQuestion(id) {
        try {
            return await questionModel.deleteQuestion(id);
        } catch(error) {
            throw error;
        }
    },

    async deleteQuestionsByQuizId(id_quiz) {
        try {
            return await questionModel.deleteQuestionsByQuizId(id_quiz);
        } catch(error) {
            throw error;
        }
    }
}

module.exports = {quizRepository, questionRepository}