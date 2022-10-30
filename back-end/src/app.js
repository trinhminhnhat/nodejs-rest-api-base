const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors')
const morgan = require('morgan');
const createError = require('http-errors');
const { v4: uuid } = require('uuid');

// Init databases
// require('./databases/init.mongodb')
require('./databases/init.redis')

const routes = require('./routes.index');
const { logEvents } = require('./v1/utils');

// Secure your Express apps by setting various HTTP headers
app.use(helmet());
// HTTP request logger middleware
app.use(morgan('common'));

app.use(cors({
    "origin": 'http://127.0.0.1:5500',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use(routes);

// handle when call api is not existed
app.use((req, res, next) => {
    // Level 1
    // res.status(404);
    // res.json({
    //     status: 404,
    //     message: 'Not Found',
    //     links: {
    //         doc: 'http://localhost:8080/api/doc'
    //     }
    // })

    // Level 2 using the http-errors library
    next(createError(404, 'Not Found'));
});

// handle when api has errors
app.use((err, req, res, next) => {
    logEvents(`errorId: ${uuid()} - ${req.url} - ${req.method} ${err.message}`);
    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message,
    });
});

module.exports = app;