const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
    __v: { type: Number, select: false },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
}, {
        timestamps: true
    }
);

module.exports = model(
    'User',
    userSchema
);
