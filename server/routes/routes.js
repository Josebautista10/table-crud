
const express = require('express');
const router = express.Router();
const dtpoeController = require('../controller');

router.get('/', dtpoeController.getAllDtpoeData);
router.put('/update/:id', dtpoeController.updateDtpoeData);
router.delete('/delete/:id', dtpoeController.deleteDtpoeData);
router.post('/create', dtpoeController.createDtpoeData);

module.exports = router;