const express = require('express');
const route = express.Router();

route
    .get('/users', (req, res, next) => {
        res.json({
            apiVersion: 'v1',
            data: 1,
        });
    })
    .post('/users', (req, res, next) => {
        res.json({
            status: 201,
            message: 'Store user successfully',
        });
    });

module.exports = route;
