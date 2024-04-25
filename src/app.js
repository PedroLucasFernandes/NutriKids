const dotenv = require('dotenv');
//importando o módulo dotenv
dotenv.config();
//configurando o dotenv já de início para que as variáveis de ambiente sejam carregadas.

const express = require('express');
const cookieParser = require('cookie-parser');

const adminRoutes = require('./routes/adminRoutes.js');
const historyRoutes = require('./routes/historyRoutes.js');
const recipeRoutes = require('./routes/recipeRoutes.js');
const quizRoutes = require('./routes/quizRoutes.js');
const gameRoutes = require('./routes/gameRoutes.js');

const app = express();
//criando uma instância do express, ou seja, um servidor.

const port = 3000

const cors = require('cors');

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin === `http://localhost:${process.env.PORT}`) {
            callback(null, true);
        } else {
            callback(new Error('Acesso bloqueado por política CORS'));
        }
    }
}));

app.use(express.json());

app.use(cookieParser());
//configurando o express para fazer o parse de cookies. o coloquei aqui para que o cookie seja parseado antes de ser usado nas rotas de admin.

app.use('/api/admin', adminRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/game', gameRoutes);

app.use(express.static('src/public'));

function sendIndexFile(req, res) {
    res.sendFile(__dirname + '/public/view/index.html')
}

app.get('/', sendIndexFile);
app.get('/Historias', sendIndexFile);
app.get('/Inicio', sendIndexFile);
app.get('/Main', sendIndexFile);
app.get('/menuHamburguer', sendIndexFile);
app.get('/Jogos', sendIndexFile);
app.get('/Quizzes', sendIndexFile);
app.get('/Receitas', sendIndexFile);
app.get('/Login', sendIndexFile);
app.get('/Admin', sendIndexFile);
app.get('/Sair', sendIndexFile);
app.get('/HistoryAdmin', sendIndexFile);
app.get('/AddHistory', sendIndexFile);
app.get('/QuizzesAdmin', sendIndexFile);
app.get('/ReicpesAdmin', sendIndexFile);
app.get('/RegisterAdmin', sendIndexFile);
app.get('/AddQuizzes', sendIndexFile);

app.listen(process.env.PORT, () => {
    console.log(`servidor está rodando em http://localhost:${process.env.PORT}`);
});