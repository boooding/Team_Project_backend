const mongoose = require('../db')

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: String
})

// model -> collection
const User = mongoose.model('user', UserSchema);

module.exports = User;