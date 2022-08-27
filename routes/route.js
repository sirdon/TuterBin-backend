const express = require('express');
const app = express();
const routes = express.Router();
const AuthRoute = require('./auth');
routes.use("/auth",AuthRoute)
module.exports = routes