const express = require('express');
const route = express.Router();

route.get('/users', (req, res, next) => {
    res.json({
        application: 'tesst',
        tesst: 123,
    });
});

module.exports = route;
