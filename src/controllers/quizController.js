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
        const created_by_number = parseInt(created_by);
        const updated_by_number = parseInt(updated_by);
        
        //validação do array de perguntas:
        if(!Array.isArray(questions)) {
            return res.status(400).json({ error: 'perguntas do quiz devem ser um array' });
        }

        questions.forEach((question, index) => {
            const requiredFields = ['question_text', 'option_1', 'option_2', 'option_3', 'option_4', 'answer', 'explanation'];

            requiredFields.forEach(field => {
                if (!question[field] || question[field] === '') {
                    return res.status(400).json({ error: `campo ${field} da pergunta ${index + 1} é obrigatório` });
                }
            });

            if (typeof question.answer !== 'number') {
                return res.status(400).json({ error: `campo answer da pergunta ${index + 1} deve ser um número` });
            }
        })


        if (!banner) {
            return res.status(400).json({ error: 'imagem para capa do quiz é obrigatória' });
        }

        try {
            const newQuiz = await quizAndQuestionService.addNewQuiz(title, created_by_number, updated_by_number, banner, questions);
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
        const id_number = parseInt(id);

        try {
            const foundQuiz = await quizAndQuestionService.findQuizWithQuestionsById(id_number);
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
        const id_number = parseInt(id);
        const updated_by_number = parseInt(updated_by);

        //validação do array de perguntas:
        if(!Array.isArray(questions)) {
            return res.status(400).json({ error: 'perguntas do quiz devem ser um array' });
        }

        questions.forEach((question, index) => {
            const requiredFields = ['question_text', 'option_1', 'option_2', 'option_3', 'option_4', 'answer', 'explanation'];

            requiredFields.forEach(field => {
                if (!question[field] || question[field] === '') {
                    return res.status(400).json({ error: `campo ${field} da pergunta ${index + 1} é obrigatório` });
                }
            });

            if (typeof question.answer !== 'number') {
                return res.status(400).json({ error: `campo answer da pergunta ${index + 1} deve ser um número` });
            }
        })


        if (!banner) {
            return res.status(400).json({ error: 'imagem para capa do quiz é obrigatória' });
        }

        try { 
            const oldQuiz = await quizAndQuestionService.findQuizWithQuestionsById(id_number);
            const updatedQuiz = await quizAndQuestionService.updateQuizWithQuestions(id_number, title, updated_by_number, banner, questions);
            
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
        const id_number = parseInt(id);

        try {
            const quiz = await quizAndQuestionService.findQuizWithQuestionsById(id_number);
            const deletedQuiz = await quizAndQuestionService.deleteQuizWithQuestions(id_number);
            
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
// curl -i -X POST -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxNDI2Mzc4NSwiZXhwIjoxNzE0MjY3Mzg1fQ.DHVJJOLeSOcrw_Wx0ak5ZewAh4WOrj4YUag08Fr7x7E" \
// -H "Content-Type: multipart/form-data" \
// -F "title=quiz 7 OU 8" \
// -F "created_by=1" \
// -F "updated_by=1" \
// -F "file=@/home/bytemeyu/Downloads/cachorroquente.webp" \
// -F "questions=[{\"question_text\":\"pergunta manga\",\"option_1\":\"opção 1\",\"option_2\":\"opção 2\",\"option_3\":\"opção 3\",\"option_4\":\"opção 4\",\"answer\":1, \"explanation\": \"a manga blabla\"}, {\"question_text\":\"pergunta melancia\",\"option_1\":\"opção 1\",\"option_2\":\"opção 2\",\"option_3\":\"opção 3\",\"option_4\":\"opção 4\",\"answer\":2, \"explanation\": \"a melancia blabla\"}]" \
// http://localhost:3000/api/quiz

//testar updateQuiz:
// curl -i -X PUT -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxNDI2Mzc4NSwiZXhwIjoxNzE0MjY3Mzg1fQ.DHVJJOLeSOcrw_Wx0ak5ZewAh4WOrj4YUag08Fr7x7E" \
// -H "Content-Type: multipart/form-data" \
// -F "title=questão teste IIIII" \
// -F "updated_by=1" \
// -F "file=@/home/bytemeyu/Downloads/cachorroquente.webp" \
// -F "questions=[{\"question_text\":\"pergunta 1\",\"option_1\":\"opção 1\",\"option_2\":\"opção 2\",\"option_3\":\"opção 3\",\"option_4\":\"opção 4\",\"answer\":1, \"explanation\": \"a melancia blabla\"}, {\"question_text\":\"pergunta 2\",\"option_1\":\"opção 1\",\"option_2\":\"opção 2\",\"option_3\":\"opção 3\",\"option_4\":\"opção 4\",\"answer\":2, \"explanation\": \"a melancia blabla\"}]" \
// http://localhost:3000/api/quiz/12

//testar deleteQuiz:
// curl -i -X DELETE -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxNDI2Mzc4NSwiZXhwIjoxNzE0MjY3Mzg1fQ.DHVJJOLeSOcrw_Wx0ak5ZewAh4WOrj4YUag08Fr7x7E" http://localhost:3000/api/quiz/12