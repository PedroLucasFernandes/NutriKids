const express = require('express');
const adminController = require('../controllers/adminController.js');

const authMiddleware = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/', adminController.loginAdmin);
router.get('/', adminController.confirmLogin);

router.use(authMiddleware.verifyToken);

router.get('/all', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);

module.exports = router;