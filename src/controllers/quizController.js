const quizAndQuestionService = require("../services/quizAndQuestionService");
const fs = require("fs");

const quizController = {
    async addNewQuiz(req, res) {
        //adicionei o if abaixo para conseguir testar com curl na formatação que estava usando. ele só vai ser usado para isso, depois podemos tirar!
        if (typeof req.body.questions === 'string') {
            try {
                req.body.questions = JSON.parse(req.body.questions);
            } catch (e) {
                return res.status(400).send("JSON mal formatado em 'questions'");
            }
        }
        

        const { title, created_by, updated_by, questions} = req.body;
        const banner = req.file.filename;

        try {
            const newQuiz = await quizAndQuestionService.addNewQuiz(title, created_by, updated_by, banner, questions);
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
        //(idem acima)
        if (typeof req.body.questions === 'string') {
            try {
                req.body.questions = JSON.parse(req.body.questions);
            } catch (e) {
                return res.status(400).send("JSON mal formatado em 'questions'");
            }
        }

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

//testar findQuiz:
//curl -X GET http://localhost:3000/api/quiz

//testar findQuizById:
//curl -X GET http://localhost:3000/api/quiz/5

//testar addNewQuiz:
// curl -i -X POST -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxMzg3NjE3NywiZXhwIjoxNzEzODc5Nzc3fQ.FRWzngmDyh4HMQuirYo09408AEsAeklMfJ1ebT7Nd8k" \
// -H "Content-Type: multipart/form-data" \
// -F "title=história teste IIIII" \
// -F "created_by=1" \
// -F "updated_by=1" \
// -F "file=@/home/bytemeyu/Downloads/bolo.webp" \
// -F "questions=[{\"question_text\":\"pergunta 1\",\"option_1\":\"opção 1\",\"option_2\":\"opção 2\",\"option_3\":\"opção 3\",\"option_4\":\"opção 4\",\"answer\":1}, {\"question_text\":\"pergunta 2\",\"option_1\":\"opção 1\",\"option_2\":\"opção 2\",\"option_3\":\"opção 3\",\"option_4\":\"opção 4\",\"answer\":2}]" \
// http://localhost:3000/api/quiz

//testar updateQuiz:
// curl -i -X PUT -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxMzg3NjE3NywiZXhwIjoxNzEzODc5Nzc3fQ.FRWzngmDyh4HMQuirYo09408AEsAeklMfJ1ebT7Nd8k" \
// -H "Content-Type: multipart/form-data" \
// -F "title=questão teste IIIII" \
// -F "updated_by=1" \
// -F "file=@/home/bytemeyu/Downloads/bolo.webp" \
// -F "questions=[{\"question_text\":\"pergunta 1\",\"option_1\":\"opção 1\",\"option_2\":\"opção 2\",\"option_3\":\"opção 3\",\"option_4\":\"opção 4\",\"answer\":1}, {\"question_text\":\"pergunta 2\",\"option_1\":\"opção 1\",\"option_2\":\"opção 2\",\"option_3\":\"opção 3\",\"option_4\":\"opção 4\",\"answer\":2}]" \
// http://localhost:3000/api/quiz/6

//testar deleteQuiz:
// curl -i -X DELETE -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxMzg3NjE3NywiZXhwIjoxNzEzODc5Nzc3fQ.FRWzngmDyh4HMQuirYo09408AEsAeklMfJ1ebT7Nd8k" http://localhost:3000/api/quiz/5