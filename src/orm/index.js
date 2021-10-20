const mongoose = require('mongoose');

const db_url = 'mongodb://localhost:27017';
const db_name = 'user';

mongoose.connect(`${db_url}/${db_name}`, {
    // config
})

const index = mongoose.connection;

// error handle
index.on('error', err => {
    console.error(err)
})

// success
index.once('open', () => {
    console.log('mongoose connection success')
})

module.exports = mongoose;