const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users_controller');

router.get('/users', users_controller.getAllUsers);
router.get('/users/:id', users_controller.findUsersById);
router.post('/users', users_controller.createUsers);
router.put('/users/:id', users_controller.updateUsers)
router.delete('/users/:id',users_controller.deleteUsers);

module.exports = router;