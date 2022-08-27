const express = require('express');
const app = express();
const routes = express.Router();
const AuthRoute = require('./auth');
const TodoRoute = require('./todo');
routes.use("/auth",AuthRoute)
routes.use("/todo",TodoRoute)
module.exports = routes