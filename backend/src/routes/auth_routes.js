const express = require('express');
const router = express.Router();

const auth_controller = require('../controllers/auth_controller');
const midd = require('../middleware/authMiddleare');

router.post('/register', auth_controller.registerUsers);
router.get('/login', auth_controller.loginUser);
router.get('/me', midd.authMiddleware, auth_controller.userOn)

module.exports = router;