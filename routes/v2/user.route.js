const express = require('express');
const route = express.Router();

route
.get('/users', (req, res, next) => {
    res.json({
        apiVersion: 'v2',
        data: 2,
    });
});

module.exports = route;
