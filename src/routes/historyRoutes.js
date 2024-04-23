const express = require('express');

const historyController = require('../controllers/historyController');

const authMiddleware = require('../middlewares/authMiddleware.js');
const router = express.Router();

const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const upload = multer({
    storage: multer.diskStorage({
        destination: "src/public/uploads",
        filename: function(req, file, cb) {
            const ext = path.extname(file.originalname);
            const fileName = `${uuidv4()}${ext}`;
            cb(null, fileName);
        }
    })
});

router.get('/', historyController.findHistory);
router.get('/:id', historyController.findHistoryById);

router.use(authMiddleware.verifyToken);
//aqui, o middleware de autenticação é aplicado a todas as rotas abaixo dele.

router.post('/', upload.array("file"), historyController.addNewHistory);
router.put('/:id', upload.array("file"), historyController.updateHistory);
router.delete('/:id', historyController.deleteHistory);

module.exports = router;