const express = require('express');
const routes = express.Router();
const userRoutes = require('./user.route')

routes.use(userRoutes);

module.exports = routes;