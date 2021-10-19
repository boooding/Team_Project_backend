const mongoose = require('mongoose');
const {models} = require("mongoose");

const url = 'mongodb://localhost:27017';
const dbName = 'user';

mongoose.connect(`${url}/${dbName}`, {
    // config
})

const db = mongoose.connection;

// error handle
db.on('error', err => {
    console.error(err)
})

// success
db.once('open', () => {
    console.log('mongoose connection success')
})

module.exports = mongoose;