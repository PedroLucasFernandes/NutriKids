const express = require('express');
//importando o módulo express para fazer o roteamento, ou seja, para definir as rotas da aplicação.
const adminController = require('../controllers/adminController.js');

const router = express.Router();
//criando um objeto router que contém as funcionalidades de roteamento do express.

router.post('/admin', adminController.loginAdmin);
router.get('/admin', adminController.confirmLogin);
//definindo as rotas /admin e /admin com os métodos post e get, respectivamente. o método post é responsável por autenticar o usuário, enquanto o método get é responsável por confirmar se o usuário está autenticado.

module.exports = router;