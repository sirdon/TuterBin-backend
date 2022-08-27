const { check } = require("express-validator");
exports.userRegisterValidation = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Enter valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Passwords must be at least 6 characters long"),
  check("mobile").optional()
    .isLength({ min: 10, max:10 })
    .withMessage("Mobile must be at least 10 characters long"),
];
exports.userLoginValidation = [
  check("email").isEmail().withMessage("Enter valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Passwords must be at least 6 characters long"),
];