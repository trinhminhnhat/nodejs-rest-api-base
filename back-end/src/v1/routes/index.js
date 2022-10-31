const express = require('express');
const routes = express.Router();
const userRoutes = require('./user.route');
const redisRoutes = require('./redis.route');

routes.use(userRoutes);
routes.use(redisRoutes);

module.exports = routes;
