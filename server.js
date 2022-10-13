const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');

const db = require('./config/db');
const userRoute = require('./Routes/User.route');

require('dotenv').config();

app.use(helmet());
app.use(morgan('common'));

const PORT = process.env.PORT || 5000;


db.connect();
// mongoose.connect('mongodb://127.0.0.1:27017', (err) => {
//     if (err) {
//         console.error('error: ', err);
//     } else {
//         console.log('Database connection successful: ', err);
//     }
// });

app.use('/v1/', userRoute);

app.use((req, res, next) => {
    // res.status(404);
    // res.json({
    //     status: 404,
    //     message: 'Not Found',
    //     links: {
    //         doc: 'http://localhost:8080/api/doc'
    //     }
    // })

    next(createError(404, 'Not Found'));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message,
    })
});

app.listen(PORT, () => {
    console.log(`Server is running port ${PORT}`);
});
