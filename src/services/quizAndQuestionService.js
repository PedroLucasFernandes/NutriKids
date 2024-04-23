const {quizRepository, questionRepository} = require('../repositories/quizRepository.js');

const quizAndQuestionService = {
    async addNewQuiz(title, created_by, updated_by, banner, questions) {
        try {
            const existingQuizTitle = await quizRepository.findQuizByTitle(title);
            if(existingQuizTitle) {
                throw new Error(`camada service: quiz com o título ${title} já existe`);
            }

            const newQuiz = await quizRepository.addNewQuiz(title, created_by, updated_by, banner);

            const id_quiz = newQuiz.id;

            const questionsPromises = questions.map(async question => {
                const question_text = question.question_text;
                const option_1 = question.option_1;
                const option_2 = question.option_2;
                const option_3 = question.option_3;
                const option_4 = question.option_4;
                const answer = question.answer;
                const explanation = question.explanation;
                return await questionRepository.createQuestion(id_quiz, question_text, option_1, option_2, option_3, option_4, answer, explanation);
            });

            await Promise.all(questionsPromises);
            return newQuiz;
        } catch(error) {
            console.error(`camada service: erro ao criar quiz com suas respectivas perguntas - ${error.message}`);
            throw error;
        }
    },

    async findAllQuizzesWithQuestions() {
        try {
            const allQuizzes = await quizRepository.findQuiz();
            const allQuizzesWithQuestionsPromises = allQuizzes.map(async quiz => {
                const questions = await questionRepository.getQuestionsByQuizId(quiz.id);
                const quizWithQuestions = { ...quiz, questions };
                return quizWithQuestions;
            });

            const allQuizzesWithQuestions = await Promise.all(allQuizzesWithQuestionsPromises);
            return allQuizzesWithQuestions;
        } catch(error) {
            console.error(`${error.message}`);
            throw error;
        }   
    },

    async findQuizWithQuestionsById(id) {
        try {
            const quiz = await quizRepository.findQuizById(id);
            if(!quiz) {
                throw new Error(`camada service: nenhum quiz encontrado com o id ${id}`);
            }

            const questions = await questionRepository.getQuestionsByQuizId(id);
            const quizWithQuestions = { ...quiz, questions };
            return quizWithQuestions;
        } catch(error) {
            console.error(`${error.message}`);
            throw error;
        }
    },

    async updateQuizWithQuestions(id, title, updated_by, banner, questions) {
        try {
            const existingQuiz = await quizRepository.findQuizById(id);
            if(!existingQuiz) {
                throw new Error(`camada service: nenhum quiz encontrado com o id ${id}`);
            }

            const updatedQuiz = await quizRepository.updateQuiz(id, title, updated_by, banner);
            
            const id_quiz = id;
            await questionRepository.deleteQuestionsByQuizId(id_quiz);
            
            const questionsPromises = questions.map(async question => {
                const question_text = question.question_text;
                const option_1 = question.option_1;
                const option_2 = question.option_2;
                const option_3 = question.option_3;
                const option_4 = question.option_4;
                const answer = question.answer;
                const explanation = question.explanation;
                return await questionRepository.createQuestion(id_quiz, question_text, option_1, option_2, option_3, option_4, answer, explanation);
            });

            await Promise.all(questionsPromises);
            return updatedQuiz;
        } catch(error) {
            console.error(`camada service: erro ao atualizar quiz com suas respectivas perguntas - ${error.message}`);
            throw error;
        }
    },

    async deleteQuizWithQuestions(id) {
        try {
            const existingQuiz = await quizRepository.findQuizById(id);
            if(!existingQuiz) {
                throw new Error(`camada service: nenhum quiz encontrado com o id ${id}`);
            }

            const deletedQuiz = await quizRepository.deleteQuiz(id);
            const deletedQuestions = await questionRepository.deleteQuestionsByQuizId(id);

            return deletedQuiz;
        } catch(error) {
            console.error(`camada service: erro ao deletar quiz com suas respectivas perguntas - ${error.message}`);
            throw error;
        }
    }
}

module.exports = quizAndQuestionService;