const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

app.use(helmet());
app.use(morgan('common'));

const PORT = process.env.PORT || 5000;

const userRouter = require('./Routes/User.route');

app.use('/v1/', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running port ${PORT}`);
});
