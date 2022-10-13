const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    user_name: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowerCase: true,
    },
    password: {
        type: String,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        require: true,
    },
});

module.exports = mongoose.model('User', User);
