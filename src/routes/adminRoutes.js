const express = require('express');
//importando o módulo express para fazer o roteamento, ou seja, para definir as rotas da aplicação.
const adminController = require('../controllers/adminController.js');

const authMiddleware = require('../middlewares/authMiddleware.js');
const router = express.Router();
//criando um objeto router que contém as funcionalidades de roteamento do express.

router.post('/', adminController.loginAdmin);
router.get('/', adminController.confirmLogin);

router.use(authMiddleware.verifyToken);

router.get('/all', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);

module.exports = router;