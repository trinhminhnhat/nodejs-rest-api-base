const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors')
const morgan = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');
const { v4: uuid } = require('uuid');

const db = require('./config/db');
const routes = require('./routes');
const logEvents = require('./helpers/logEvents');

app.use(helmet());
app.use(morgan('common'));

app.use(cors({
    "origin": 'http://127.0.0.1:5500',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

// db.connect();
// mongoose.connect('mongodb://127.0.0.1:27017', (err) => {
//     if (err) {
//         console.error('error: ', err);
//     } else {
//         console.log('Database connection successful: ', err);
//     }
// });

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