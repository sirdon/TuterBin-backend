const express = require('express');
const routes = express.Router();
const AuthController = require('../controller/Authentication');
const { userRegisterValidation, userLoginValidation } = require('../validation/auth')
const { runValidation } = require("../validation");
routes.use("/register",userRegisterValidation, runValidation, AuthController.register)
routes.use("/login",userLoginValidation, runValidation, AuthController.login)
routes.use("/logout", AuthController.logout)
module.exports = routes