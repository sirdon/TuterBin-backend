const { check } = require("express-validator");
exports.todoListValidation = [
  check("tasks")
    .isArray({ min: 1 })
    .withMessage("One or more tasks are required"),
];
