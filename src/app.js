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

const app = express();
//criando uma instância do express, ou seja, um servidor.

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

app.use(express.static('src/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/view/index.html');
});

app.listen(process.env.PORT, () => {
    console.log(`servidor está rodando em http://localhost:${process.env.PORT}`);
});