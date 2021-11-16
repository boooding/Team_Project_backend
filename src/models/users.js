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
    avatar_url: {
        type: String,
        required: false,
        select: true
    },
    introduction: {
        type: String,
        default: "The blogger is to lazy to introduce himself",
        required: false,
        select: true
    },
    blogList: {
        type: [String]
    }
}, {
        timestamps: true
    }
);

module.exports = model(
    'User',
    userSchema
);
