// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    email:{
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
});
module.exports = User = mongoose.model('User', UserSchema);