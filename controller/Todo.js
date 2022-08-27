const Users = require("../models/User")
const Todos = require("../models/Todo")
module.exports = {
    async createTodo(req, res) {
        try {
            const { tasks } = req.body;
            const errorArr = []
            const todoTasks = []
            tasks.forEach((task) => {
                if (!task.description) errorArr.push(task);
                else todoTasks.push({ description: task.description })
            })
            if (errorArr.length) throw new Error("Please provide a description for each task");
            const userTodos = await Todos.findOne({ userId: req.user._id });
            let todos;
            if (userTodos) {
                userTodos.tasks = todoTasks;
                todos = await userTodos.save();
            } else {
                todos = await new Todos({
                    tasks: todoTasks,
                    userId: req.user._id,
                }).save()
            }

            return res.status(200).json({ todos, status: 'success' });

        } catch (error) {
            res.status(400).send({
                error: error.message, status: false
            })
        }
    },
    getTodo(req, res) {
        try {
            Todos.findOne({ userId: req.user._id }).exec((err, todos) => {
                if (err || !todos) {
                    return res.status(400).json({
                        error: "Todos not found", status: false
                    });
                } else {
                    return res.status(200).json({ todos, status: 'success' });
                }
            })
        } catch (error) {
            res.status(400).send({
                error: error.message, status: false
            })
        }
    },
    updateTodo(req, res) {
        try {
            const { tasks } = req.body;
            const errorArr = []
            const todoTasks = []
            tasks.forEach((task) => {
                if (!task.description) errorArr.push(task);
                else todoTasks.push({ description: task.description })
            })
            if (errorArr.length) throw new Error("Please provide a description for each task");

            Todos.findOne({ userId: req.user._id }).exec((err, todos) => {
                if (err || !todos) {
                    return res.status(400).json({
                        error: "Todos not found",
                    });
                } else {
                    todos.tasks = todoTasks;
                    todos.save()
                    return res.status(200).json({ todos, message: "Todos updated successfully" });
                }
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                error: error.message
            })
        }
    },
    removeTodo(req, res) {
        try {
            Todos.findOne({ userId: req.user._id }).exec((err, todos) => {
                if (err || !todos) {
                    return res.status(400).json({
                        error: "Todos not exist",
                    });
                } else {
                    todos.tasks = [];
                    todos.save()
                    return res.status(200).json({ message: "Todos deleted successfully" });
                }
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                error: error.message
            })
        }
    },


}
