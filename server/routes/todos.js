const express = require('express');
var router = express.Router();
var controller = require('../controllers/todoController')
var jwtHelper = require('../helpers/jwt')

router.get('/', jwtHelper, controller.findTodos);
router.post('/', jwtHelper, controller.createTodo);
router.put('/:id', jwtHelper, controller.updateTodo);
router.delete('/:id', jwtHelper, controller.deleteTodo);

module.exports = router;