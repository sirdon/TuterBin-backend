const express = require('express');
const routes = express.Router();
const AuthController = require('../controller/Authentication');
routes.use("/login",AuthController.login)
routes.use("/logout",AuthController.logout)
module.exports = routes