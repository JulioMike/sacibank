const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users_controller');
const midd = require('../middleware/authMiddleare');

router.get('/users', users_controller.getAllUsers);
router.get('/users/:id', users_controller.findUsersById);
router.put('/users/:id', users_controller.updateUsers)
router.delete('/users/:id',users_controller.deleteUsers);
router.get('/todos', midd.authMiddleware, users_controller.getAllUsers);


module.exports = router;