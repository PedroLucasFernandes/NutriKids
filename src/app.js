const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');

const adminRoutes = require('./routes/adminRoutes.js');
const historyRoutes = require('./routes/historyRoutes.js');
const recipeRoutes = require('./routes/recipeRoutes.js');
const quizRoutes = require('./routes/quizRoutes.js');
//const gameRoutes = require('./routes/gameRoutes.js');

const app = express();

const cors = require('cors');

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [`http://localhost:${process.env.PORT}`, 'https://alpha01.alphaedtech.org.br'];
        if (!origin || allowedOrigins.indexOf(origin) >= 0) {
            callback(null, true);
        } else {
            callback(new Error('Acesso bloqueado por política CORS'));
        }
    }
}));

app.use(express.json());

app.use(cookieParser());

app.use('/api/admin', adminRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/quiz', quizRoutes);
//app.use('/api/game', gameRoutes);

app.use(express.static('src/public'));

function sendIndexFile(req, res) {
    res.sendFile(__dirname + '/public/view/index.html')
}

app.get('/', sendIndexFile);
app.get('/Historias', sendIndexFile);
app.get('/Inicio', sendIndexFile);
app.get('/menuHamburguer', sendIndexFile);
// app.get('/Jogos', sendIndexFile);
app.get('/Quizzes', sendIndexFile);
app.get('/Receitas', sendIndexFile);
app.get('/Administrativo', sendIndexFile);
app.get('/Admin', sendIndexFile);
app.get('/Sair', sendIndexFile);
app.get('/HistoryAdmin', sendIndexFile);
app.get('/AddHistory', sendIndexFile);
app.get('/QuizzesAdmin', sendIndexFile);
app.get('/RecipesAdmin', sendIndexFile);
app.get('/RegisterAdmin', sendIndexFile);
app.get('/AddQuizzes', sendIndexFile);

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}, https://alpha01.alphaedtech.org.br`);
});