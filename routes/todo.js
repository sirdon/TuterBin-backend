const express = require('express');
const routes = express.Router();
const TodoController = require('../controller/Todo');
const { validateToken } = require('../controller/Authentication');
const { todoListValidation } = require('../validation/todo')
const { runValidation } = require("../validation");
routes.post("/create-todo",todoListValidation, runValidation, validateToken, TodoController.createTodo)
routes.get("/get-todo", validateToken, TodoController.getTodo)
routes.put("/update-todo", validateToken, TodoController.updateTodo)
routes.delete("/delete-todo", validateToken, TodoController.removeTodo)
module.exports = routes