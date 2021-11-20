const express = require('express');
const router = express.Router();

const moviment_controller = require('../controllers/moviment_controller');
const midd = require('../middleware/authMiddleare');

router.post('/saque',midd.authMiddleware ,moviment_controller.outSaque);

module.exports = router;
