const express = require('express');

const historyController = require('../controllers/historyController');

const authMiddleware = require('../middlewares/authMiddleware.js');

const validateData = require('../middlewares/dynamicValidationMiddleware.js');

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

const addNewHistoryValidationRules = {
    title: { required: true, type: 'string', maxLength: 255 },
    story: { required: true },
    created_by: { required: true, type: 'number' },
    updated_by: { required: true, type: 'number' }
}

const findHistoryByIdValidationRules = {
    id: { required: true, type: 'number' }
}

const updateHistoryValidationRules = {
    id: { required: true, type: 'number' },
    title: { required: true, type: 'string', maxLength: 255 },
    story: { required: true },
    updated_by: { required: true, type: 'number' }
}

const deleteHistoryValidationRules = {
    id: { required: true, type: 'number' }
}

router.get('/', historyController.findHistory);
router.get('/:id', validateData(findHistoryByIdValidationRules), historyController.findHistoryById);

router.use(authMiddleware.verifyToken);

router.post('/', upload.array("file"), validateData(addNewHistoryValidationRules), historyController.addNewHistory);
router.put('/:id', upload.array("file"), validateData(updateHistoryValidationRules), historyController.updateHistory);
router.delete('/:id', validateData(deleteHistoryValidationRules), historyController.deleteHistory);

module.exports = router;