const express = require('express');
const route = express.Router();

const { setPromise, getPromise } = require('../controllers/redis.controller');

route.put('/redis/set-key', setPromise);
route.post('/redis/get-key', getPromise);

module.exports = route;
