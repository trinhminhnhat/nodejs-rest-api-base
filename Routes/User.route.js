const express = require('express');
const route = express.Router();

route
.get('/users', (req, res, next) => {
    a
    res.json({
        application: 'tesst',
        test: 123,
    });
})
.post('/users', (req, res, next) => {
    res.json({
        AS: 'post',
    });
});

module.exports = route;
