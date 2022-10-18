const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');
const { v4: uuid } = require('uuid');

const db = require('./config/db');
const userRoute = require('./Routes/User.route');
const logEvents = require('./Helpers/logEvents');

require('dotenv').config();

app.use(helmet());
app.use(morgan('common'));

const PORT = process.env.PORT || 5000;

// db.connect();
// mongoose.connect('mongodb://127.0.0.1:27017', (err) => {
//     if (err) {
//         console.error('error: ', err);
//     } else {
//         console.log('Database connection successful: ', err);
//     }
// });

app.use('/v1/', userRoute);

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

app.listen(PORT, () => {
    console.log(`Server is running port ${PORT}`);
});
