const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin === `http://localhost:${port}`) {
            callback(null, true);
        } else {
            callback(new Error('Acesso bloqueado por política CORS'));
        }
    }
}));

app.use(express.json());
app.use(express.static('src/public'));

const firstPage = require('./public/view/firstPage');
app.get('/', firstPage);

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});